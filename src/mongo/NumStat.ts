module.exports = (mongoose: any) => {
  const Model = mongoose.model(
    "numStat",
    new mongoose.Schema({
      ac: {
        required: true,
        type: Number,
      },
      ap: {
        required: true,
        type: Number,
      },
      sta: {
        required: true,
        type: Number,
      },
      time: {
        required: true,
        type: Date,
        unique: true,
      },
    }),
  );
  return Model;
};
