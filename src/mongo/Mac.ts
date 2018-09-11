module.exports = (mongoose: any) => {
	const Model = mongoose.model(
		"mac",
		new mongoose.Schema({
			company: {
				type: String,
			},
			connected: {
				default: false,
				type: Boolean,
			},
			mac: {
				required: true,
				type: String,
				unique: true,
			},

			time: {
				type: Date,
			},
		}),
	);
	return Model;
};
