const FIELD = "user";

function match(rawInput) {
  if (rawInput.length < 2) return { matches: [], data: [] };
  const input = [].concat(rawInput);
  const matches = [].concat(input).reduce((ar, e, i, a) => {
    const filtered = input.filter(inp => inp[FIELD] !== e[FIELD]);
    if (filtered.length === 0) {
      const rndIdx = Math.floor(Math.random() * ar.length);
      const pair = { [e[FIELD]]: Object.values(ar[rndIdx])[0] };
      ar[rndIdx] = { [Object.keys(ar[rndIdx])[0]]: e[FIELD] };
      return [...ar, pair];
    } else {
      const rndIdx = Math.floor(Math.random() * filtered.length);
      const item = filtered.splice(rndIdx, 1)[0];
      const deleteIdx = input.findIndex(inp => inp[FIELD] === item[FIELD]);
      input.splice(deleteIdx, 1);
      return [...ar, { [e[FIELD]]: item[FIELD] }];
    }
  }, []);
  const data = getMatches(rawInput, matches);
  return {
    matches,
    data,
  };
}

function getMatches(items, matches) {
  return matches.map(match => {
    return {
      from: items.find(
        inp => String(Object.keys(match)[0]) === String(inp[FIELD]),
      ),
      to: items.find(
        inp => String(Object.values(match)[0]) === String(inp[FIELD]),
      ),
    };
  });
}

module.exports = {
  match,
  getMatches,
};
