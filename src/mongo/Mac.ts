module.exports = (mongoose: any) => {
    const Model = mongoose.model('mac', new mongoose.Schema({
        mac: {
            type: String,
            required: true,
            unique: true
        },
        company: {
            type: String
        },
        connected: {
            type: Boolean,
            default: false
        },
        time: {
            type: Date
        }
    }));
    return Model;
}