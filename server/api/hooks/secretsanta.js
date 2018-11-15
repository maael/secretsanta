module.exports = {
  POST: async ({ _id, deadlineDate, revealDate }, agenda) => {
    await agenda.schedule(deadlineDate, "match and send match emails", {
      secret: _id,
    });
    await agenda.schedule(revealDate, "send reveal emails", {
      secret: _id,
    });
  },
  PUT: async ({ _id, deadlineDate, revealDate }, agenda) => {
    await agenda.cancel({ "data.secret": _id });
    await agenda.schedule(deadlineDate, "match and send match emails", {
      secret: _id,
    });
    await agenda.schedule(revealDate, "send reveal emails", {
      secret: _id,
    });
  },
};
