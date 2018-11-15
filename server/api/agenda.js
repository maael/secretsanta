require("dotenv-extended").load();
const Agenda = require("agenda");
const { match, reveal } = require("./lib/agendaJobs");

const { JOB_COLLECTION, MONGO_URI } = process.env;

const agenda = new Agenda({
  db: { address: MONGO_URI, collection: JOB_COLLECTION },
});

agenda.define("match and send match emails", match);
agenda.define("send reveal emails", reveal);

module.exports = async function() {
  await agenda.start();
  return agenda;
};
