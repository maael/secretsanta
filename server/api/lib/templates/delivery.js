const fs = require("fs");
const template = fs.readFileSync(__dirname + "/delivery.html").toString();

const formatDate = dateStr => {
  const d = new Date(dateStr);
  return `${`0${d.getDate()}`.slice(-2)}/${`0${d.getMonth() + 1}`.slice(
    -2,
  )}/${d.getFullYear()}`;
};

const html = ({ to, from, secretSanta }) =>
  template
    .replace("%TITLE%", `Delivery notes for ${secretSanta.name}!`)
    .replace(
      "%HEADER%",
      `Hey ${to.name}! Your secret santa updated your delivery notes!`,
    )
    .replace(
      "%NOTE%",
      from.deliveryNote ? from.deliveryNote : "They didn't add any notes!",
    )
    .replace("%REVEAL%", formatDate(secretSanta.revealDate));

const text = ({ to }) => `
  Hey ${to.name}! You have delivery notes from your secret santa!
`;

module.exports = { html, text };
