require("dotenv-extended").load();
const Secret = require("../models/secretsanta");
const { match, getMatches } = require("./match");
const send = require("./mail");

async function matchJob(job, done) {
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
}

async function revealJob(job, done) {
  const { secret } = job.attrs.data;
  const secretSanta = await Secret.findById(secret);
  console.info(">>> [reveal]", secretSanta);
  const matchData = getMatches(secretSanta.elfs, secretSanta.pairings);
  console.info(">>> [reveal match found?]", matchData);
  await Promise.all(
    matchData.map(({ from, to }) => {
      if (!from || !from.email) return Promise.resolve();
      console.log("emailing reveal", from.name, from.email);
      return send(
        from.email,
        `Secret Santa (${secretSanta.name}) Reveal!`,
        "reveal",
        { to, secretSanta, from, matches: matchData },
      );
    }),
  );
  done();
}

module.exports = {
  match: matchJob,
  reveal: revealJob,
};
