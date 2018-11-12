require("dotenv-extended").load();
const Agenda = require("agenda");
const Secret = require("./models/secretsanta");
const match = require("./lib/match");
const send = require("./lib/mail");

const { JOB_COLLECTION, MONGO_URI } = process.env;

const agenda = new Agenda({
  db: { address: MONGO_URI, collection: JOB_COLLECTION },
});

agenda.define("match and send match emails", async (job, done) => {
  const { secret } = job.attrs.data;
  const secretSanta = await Secret.findById(secret);
  const matched = match(secretSanta.elfs);
  secretSanta.pairings = matched;
  const result = await secretSanta.save();
  console.info(">>> [matching]", result, matched);
  await Promise.all(
    secretSanta.elfs.map(({ name, email }) => {
      console.log("emailing", name, email);
      if (!email) return Promise.resolve();
      return send(
        email,
        `Secret Santa (${secretSanta.name}) Match! Get ready to gift!`,
        "Hi there",
      );
    }),
  );
  done();
});

agenda.define("send reveal emails", async (job, done) => {
  const { secret } = job.attrs.data;
  const secretSanta = await Secret.findById(secret);
  console.info(">>> [reveal]", secretSanta);
  done();
});

module.exports = async function() {
  await agenda.start();
  return agenda;
};
