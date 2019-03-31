const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TodoSchema = new Schema({
    content: { type: String, required: true, max: 130 },
    finished: { type: Boolean, required: false },
    order: { type: Number, required: false }
});

module.exports = mongoose.model('Todo', TodoSchema);