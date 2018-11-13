require("dotenv-extended").load();
const nodemailer = require("nodemailer");
const mailgunTransport = require("nodemailer-mailgun-transport");
const templates = {
  match: require("./templates/match"),
  reveal: require("./templates/reveal"),
};

const { MAILGUN_ACTIVE_API_KEY, MAILGUN_DOMAIN } = process.env;

const mailgunOptions = {
  auth: {
    api_key: MAILGUN_ACTIVE_API_KEY,
    domain: MAILGUN_DOMAIN,
  },
};
const transport = mailgunTransport(mailgunOptions);
const client = nodemailer.createTransport(transport);

module.exports = async function send(to, subject, type, data) {
  return new Promise((resolve, reject) => {
    const template = templates[type];
    if (!template) return reject(new Error(`No template for: ${type}`));
    client.sendMail(
      {
        from: '"Santa" <santa@secretsanta.space>',
        to,
        subject,
        html: template.html(data),
        text: template.text(data),
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
