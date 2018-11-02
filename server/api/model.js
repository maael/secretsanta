const { Router } = require("express");

function createModelApi(Model, io, boltOnRouter) {
  const router = new Router();

  if (boltOnRouter) router.use("/", boltOnRouter(io));

  router.get("/", async (_, res) => {
    const result = await Model.find();
    res.send(result);
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const m = await Model.findById(id);
    res.send(m);
  });

  router.post("/", async (req, res) => {
    const m = new Model(req.body);
    const result = await m.save();
    res.send(result);
  });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const m = await Model.findById(id);
    m.set(req.body);
    const result = await m.save();
    res.send(result);
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const m = await Model.findById(id);
    if (!m) return res.status(400).send({ err: "Entity does not exist" });
    const result = await m.remove();
    res.send(result);
  });

  return router;
}

module.exports = createModelApi;
