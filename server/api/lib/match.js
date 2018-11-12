module.exports = function match(rawInput) {
  if (rawInput.length < 2) return undefined;
  const input = [].concat(rawInput);
  const done = [].concat(input).reduce((ar, e, i, a) => {
    const filtered = input.filter(({ _id }) => _id !== e._id);
    if (filtered.length === 0) {
      const rndIdx = Math.floor(Math.random() * ar.length);
      const pair = { [e._id]: Object.values(ar[rndIdx])[0] };
      ar[rndIdx] = { [Object.keys(ar[rndIdx])[0]]: e._id };
      return [...ar, pair];
    } else {
      const rndIdx = Math.floor(Math.random() * filtered.length);
      const item = filtered.splice(rndIdx, 1)[0];
      const deleteIdx = input.findIndex(({ _id }) => _id === item._id);
      input.splice(deleteIdx, 1);
      return [...ar, { [e._id]: item._id }];
    }
  }, []);
  return done;
};
