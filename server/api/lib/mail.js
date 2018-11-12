require("dotenv-extended").load();
const nodemailer = require("nodemailer");
const mailgunTransport = require("nodemailer-mailgun-transport");

const { MAILGUN_ACTIVE_API_KEY, MAILGUN_DOMAIN } = process.env;

const mailgunOptions = {
  auth: {
    api_key: MAILGUN_ACTIVE_API_KEY,
    domain: MAILGUN_DOMAIN,
  },
};
const transport = mailgunTransport(mailgunOptions);
const client = nodemailer.createTransport(transport);

module.exports = async function send(to, subject, text) {
  return new Promise((resolve, reject) => {
    client.sendMail(
      {
        from: '"Santa" <santa@secretsanta.space>',
        to,
        subject,
        text,
      },
      (err, info) => {
        if (err) {
          return reject(err);
        }
        resolve(info);
      },
    );
  });
};
