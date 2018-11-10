const { Router } = require("express");

function createModelApi(Model, io, opts = {}) {
  const router = new Router();
  const options = {
    bolton: undefined,
    enabledMethods: ["GET", "POST", "PUT", "DELETE"],
    ...opts,
  };

  if (options.bolton) router.use("/", options.bolton(io));

  if (options.enabledMethods.includes("GET")) {
    router.get("/", async (_, res) => {
      const result = await Model.find();
      res.send(result);
    });

    router.get("/:id", async (req, res) => {
      const { id } = req.params;
      const m = await Model.findById(id);
      res.send(m);
    });
  }

  if (options.enabledMethods.includes("POST")) {
    router.post("/", async (req, res) => {
      const m = new Model({
        ...req.body,
        createdBy: req.locals.user,
        updatedBy: req.locals.user,
      });
      const result = await m.save();
      res.send(result);
    });
  }

  if (options.enabledMethods.includes("PUT")) {
    router.put("/:id", async (req, res) => {
      const { id } = req.params;
      const m = await Model.findById(id);
      m.set({ ...req.body, updatedBy: req.locals.user });
      const result = await m.save();
      io.sockets.in(id).emit("update");
      res.send(result);
    });
  }

  if (options.enabledMethods.includes("DELETE")) {
    router.delete("/:id", async (req, res) => {
      const { id } = req.params;
      const m = await Model.findById(id);
      if (!m) return res.status(400).send({ err: "Entity does not exist" });
      const result = await m.remove();
      res.send(result);
    });
  }

  return router;
}

module.exports = createModelApi;
