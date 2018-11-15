const { readdir } = require("fs");
const { join } = require("path");
const { Router } = require("express");
const Model = require("../models/secretsanta");
const { match: matchJob } = require("../lib/agendaJobs");

module.exports = io => {
  const router = new Router();

  router.get("/elf/displays", async (_, res) => {
    const staticUrl = join("static", "imgs", "displays");
    readdir(join(__dirname, "..", "..", "..", staticUrl), (err, files) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(
        files.map(f => ({
          url: `/${staticUrl}/${f}`,
          key: f.split(".")[0],
        })),
      );
    });
  });

  router.get("/elf/:elf/addresses", async (req, res) => {
    const { elf } = req.params;
    const variations = await collectElfVariations(elf, "address");
    res.send(variations);
  });

  router.get("/elf/:elf/hints", async (req, res) => {
    const { elf } = req.params;
    const variations = await collectElfVariations(elf, "hints");
    res.send(variations);
  });

  async function collectElfVariations(elf, field) {
    const elfVariations = await Model.find(
      { "elfs.user": elf },
      { _id: 0, [`elfs.${field}`]: 1 },
    );
    const flattenedVariations = elfVariations.map(({ elfs }) => elfs[0][field]);
    return [...new Set(flattenedVariations)].filter(i => i);
  }

  router.get("/elf/:elf", async (req, res) => {
    const { elf } = req.params;
    const elfSecrets = await Model.find({ "elfs.user": elf });
    res.send(elfSecrets);
  });

  router.get("/santa/:elf", async (req, res) => {
    const { elf } = req.params;
    const elfSecrets = await Model.find({ createdBy: elf });
    res.send(elfSecrets);
  });

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
    const length = m.elfs.push({ ...req.body, user: req.locals.user });
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
    await Model.updateOne({ _id: secretsanta, "elfs._id": elf }, operation);
    const elfs = await Model.findOne(
      { _id: secretsanta, "elfs._id": elf },
      { _id: 0, elfs: { $elemMatch: { _id: elf } } },
    );
    const result = elfs.elfs && elfs.elfs.length > 0 ? elfs.elfs[0] : undefined;
    if (result) {
      io.sockets.in(secretsanta).emit("update");
      res.send(result);
    } else {
      res.status(400).send({ err: "No elf found", secretsanta, elf });
    }
  });

  router.get("/:secretsanta/rematch", async (req, res) => {
    const { secretsanta } = req.params;
    matchJob({ attrs: { data: { secret: secretsanta } } }, () => {
      res.send({ ok: 1 });
    });
  });

  return router;
};
