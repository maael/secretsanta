module.exports = {
  POST: async ({ _id, deadlineDate, revealDate }, agenda) => {
    await agenda.schedule(
      /*deadlineDate*/ "in two minutes",
      "match and send match emails",
      { secret: _id },
    );
    await agenda.schedule(
      /*revealDate*/ "in three minutes",
      "send reveal emails",
      {
        secret: _id,
      },
    );
  },
  PUT: async ({ _id, deadlineDate, revealDate }, agenda) => {
    await agenda.cancel({ "data.secret": _id });
    await agenda.schedule(
      /*deadlineDate*/ "in one minute",
      "match and send match emails",
      { secret: _id },
    );
    await agenda.schedule(
      /*revealDate*/ "in three minutes",
      "send reveal emails",
      {
        secret: _id,
      },
    );
  },
};
