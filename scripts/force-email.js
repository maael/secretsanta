const { reveal } = require("../server/api/lib/agendaJobs");

const secretId = process.argv.slice(-1).pop();

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
