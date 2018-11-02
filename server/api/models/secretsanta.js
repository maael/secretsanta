const mongoose = require("mongoose");

const randomChristmasName = () => {
  const names = ["Prancer", "Dancer", "Dasher", "Vixen", "Rudolph", "Comet"];
  return names[Math.floor(Math.random() * names.length)];
};

const ElfSchema = {
  name: { type: "string", default: randomChristmasName },
  email: { type: "string" },
  address: { type: "string", default: "The North Pole" },
  hints: { type: "string" },
};

const ExclusionSchema = {
  elfOne: { type: mongoose.ObjectId },
  elfTwo: { type: mongoose.ObjectId },
};

const PairSchema = {
  elfOne: { type: mongoose.ObjectId },
  elfOneNote: { type: mongoose.ObjectId },
  elfTwo: { type: mongoose.ObjectId },
  elfTwonote: { type: mongoose.ObjectId },
};

const SecretSantaSchema = new mongoose.Schema(
  {
    name: { type: "string", required: true },
    santaId: { type: "string", default: () => new mongoose.Types.ObjectId() },
    elfs: [ElfSchema],
    exclusions: [ExclusionSchema],
    pairings: [PairSchema],
    budget: { type: "number", default: 10 },
    revealDate: {
      type: Date,
      default: new Date(`${new Date().getFullYear()}-12-25 19:00`),
    },
    deadlineDate: {
      type: Date,
      default: new Date(`${new Date().getFullYear()}-12-01 12:00`),
    },
  },
  {
    timestamps: true,
    strict: true,
  },
);

module.exports = mongoose.model("SecretSanta", SecretSantaSchema);
