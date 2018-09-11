module.exports = (mongoose: any) => {
	const Model = mongoose.model(
		"chartData",
		new mongoose.Schema({
			num: {
				required: true,
				type: Number,
			},
			time: {
				required: true,
				type: Date,
				unique: true,
			},
			type: {
				required: true,
				type: String,
			},
		}),
	);
	return Model;
};
