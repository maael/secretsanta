const fs = require("fs");
const template = fs.readFileSync(__dirname + "/match.html").toString();

const formatDate = dateStr => {
  const d = new Date(dateStr);
  return `${`0${d.getDate()}`.slice(-2)}/${`0${d.getMonth() + 1}`.slice(
    -2,
  )}/${d.getFullYear()}`;
};

const html = ({ to, secretSanta }) =>
  template
    .replace("%TITLE%", `${secretSanta.name} has started!`)
    .replace("%HEADER%", `You are buying for ${to.name}`)
    .replace("%NAME%", to.name)
    .replace("%HINT%", to.hints ? to.hints : "They gave no hints! Good luck!")
    .replace(
      "%ADDRESS%",
      to.address ? to.address : "They gave no address! Good luck!",
    )
    .replace("%REVEAL%", formatDate(secretSanta.revealDate))
    .replace("%BUDGET%", secretSanta.budget);

const text = ({ to }) => `
  Hey! You're buying a gift for ${to.name}. Their gift hint is ${
  to.hints
}. Their address is ${to.address}. Get gifting!
`;

module.exports = { html, text };
