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
    io.sockets.in(secretsanta).emit("update");
    res.send(result.elfs[length - 1]);
  });

  router.put("/:secretsanta/elf/:elf", async (req, res) => {
    const { elf, secretsanta } = req.params;
    const operation = Object.entries(req.body).reduce(
      (op, [k, v]) => ({ $set: { ...op.$set, [`elfs.$.${k}`]: v } }),
      { $set: {} },
    );
    delete operation.$set["elfs.$._id"];
    console.log("OPERATION", operation, secretsanta, elf);
    await Model.updateOne({ _id: secretsanta, "elfs._id": elf }, operation);
    console.log("DONE");
    const elfs = await Model.findOne(
      { _id: secretsanta, "elfs._id": elf },
      { _id: 0, elfs: { $elemMatch: { _id: elf } } },
    );
    console.log("ELFS");
    const result = elfs.elfs && elfs.elfs.length > 0 ? elfs.elfs[0] : undefined;
    console.log("RESULTS");
    if (result) {
      io.sockets.in(secretsanta).emit("update");
      res.send(result);
    } else {
      res.status(400).send({ err: "No elf found", secretsanta, elf });
    }
  });

  return router;
};
