require("dotenv-extended").load();
const Agenda = require("agenda");
const Secret = require("./models/secretsanta");
const { match, getMatches } = require("./lib/match");
const send = require("./lib/mail");

const { JOB_COLLECTION, MONGO_URI } = process.env;

const agenda = new Agenda({
  db: { address: MONGO_URI, collection: JOB_COLLECTION },
});

agenda.define("match and send match emails", async (job, done) => {
  const { secret } = job.attrs.data;
  const secretSanta = await Secret.findById(secret);
  const { matches, data } = match(secretSanta.elfs);
  secretSanta.pairings = matches;
  const result = await secretSanta.save();
  console.info(">>> [matching]", result, matches);
  await Promise.all(
    data.map(({ from, to }) => {
      if (!from || !from.email) return Promise.resolve();
      console.log("emailing match", from.name, from.email);
      return send(
        from.email,
        `Secret Santa (${secretSanta.name}) Match! Get ready to gift!`,
        "match",
        { to, secretSanta },
      );
    }),
  );
  done();
});

agenda.define("send reveal emails", async (job, done) => {
  const { secret } = job.attrs.data;
  const secretSanta = await Secret.findById(secret);
  console.info(">>> [reveal]", secretSanta);
  const matchData = getMatches(secretSanta.elfs, secretSanta.pairings);
  console.info(">>> [reveal match found]", matchData);
  await Promise.all(
    matchData.map(({ from, to }) => {
      if (!from || !from.email) return Promise.resolve();
      console.log("emailing reveal", from.name, from.email);
      return send(
        from.email,
        `Secret Santa (${secretSanta.name}) Reveal! Get ready to gift!`,
        "reveal",
        { to, secretSanta, from, matches: matchData },
      );
    }),
  );
  done();
});

module.exports = async function() {
  await agenda.start();
  return agenda;
};
