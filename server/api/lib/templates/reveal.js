const fs = require("fs");
const template = fs.readFileSync(__dirname + "/reveal.html").toString();

const html = ({ from, to, secretSanta, matches }) =>
  template
    .replace("%HEADER%", `${secretSanta.name} is over!`)
    .replace("%NAME%", from.name)
    .replace("%SECRET_SANTA%", secretSanta.name)
    .replace("%MATCH_NAME%", to.name)
    .replace(
      "%ROWS%",
      matches.map(({ from, to }) => htmlRow(from.name, to.name)).join(""),
    );

const htmlRow = (from, to) => `
<tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
    ${from} bought for ${to}
  </td>
</tr>
`;

const text = ({ to, secretSanta }) => `
  You can see below who got who!
`;

module.exports = { html, text };
