const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/secretsanta");
const { reveal } = require("../server/api/lib/agendaJobs");

console.info("Loaded reveal", reveal && typeof reveal === "function");

const secretId = process.argv.slice(-1).pop();

console.info("Received arg", secretId);

(async () => {
  console.info("Starting force");
  if (secretId) {
    console.info("Forcing email for", secretId);
    await reveal(
      {
        attrs: {
          data: {
            secret: secretId,
          },
        },
      },
      err => {
        if (err) {
          console.error("Error forcing", secretId, ":", err);
        } else {
          console.info("Successfully forced", secretId);
        }
      },
    );
  } else {
    console.error("Skipping, no secret given");
  }
})();
