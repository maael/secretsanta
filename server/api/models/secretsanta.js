const mongoose = require("mongoose");

const randomChristmasName = () => {
  const names = [
    "Prancer",
    "Dancer",
    "Dasher",
    "Vixen",
    "Rudolph",
    "Comet",
    "Blitzen",
    "Cupid",
    "Donner",
    "Gary",
  ];
  return names[Math.floor(Math.random() * names.length)];
};

const randomDisplayPicture = () => {
  return Math.floor(Math.random() * 8) + 1;
};

const ElfSchema = {
  name: { type: "string", default: randomChristmasName },
  display: { type: "string", default: randomDisplayPicture },
  email: { type: "string" },
  address: { type: "string", default: "The North Pole" },
  hints: { type: "string" },
  user: { type: "string", required: true },
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
    budget: { type: "string", default: "10" },
    revealDate: {
      type: Date,
      default: new Date(`${new Date().getFullYear()}-12-25 19:00`),
    },
    deadlineDate: {
      type: Date,
      default: new Date(`${new Date().getFullYear()}-12-01 12:00`),
    },
    createdBy: { type: "string", required: true },
    updatedBy: { type: "string", required: true },
  },
  {
    timestamps: true,
    strict: true,
  },
);

module.exports = mongoose.model("SecretSanta", SecretSantaSchema);
