module.exports = (mongoose: any) => {
    const Model = mongoose.model('numStat', new mongoose.Schema({
        ac: {
            type: Number,
            required: true
        },
        ap: {
            type: Number,
            required: true
        },
        sta: {
            type: Number,
            required: true
        },
        time: {
            type: Date,
            required: true,
            unique: true
        }
    }));
    return Model;
}