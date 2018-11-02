const { Router } = require("express");
const Model = require("../models/secretsanta");

module.exports = io => {
  const router = new Router();

  router.get("/:secretsanta/elf/:elf", async (req, res) => {
    const { elf, secretsanta } = req.params;
    const m = await Model.findById(secretsanta);
    if (!m) {
      return res
        .status(400)
        .send({ err: "No such secret santa exists", secretsanta });
    }
    const foundElf = m.elfs.find(({ id }) => id === elf);
    if (!foundElf) {
      return res
        .status(400)
        .send({ err: "No such elf exists", elf, secretsanta });
    }
    res.send(foundElf);
  });

  router.post("/:secretsanta/elf", async (req, res) => {
    const { secretsanta } = req.params;
    const m = await Model.findById(secretsanta);
    if (!m) {
      return res
        .status(400)
        .send({ err: "No such secret santa exists", secretsanta });
    }
    const length = m.elfs.push(req.body);
    const result = await m.save();
    io.sockets.in(secretsanta).emit("update", result);
    res.send(result.elfs[length - 1]);
  });

  return router;
};
