const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let emailSchema = new Schema(
    {
        name: { type: String },
        phone: { type: String },
        email: { type: String },
        message: { type: String }
    }, {
    collection: 'datas'
}

);

module.exports = mongoose.model("Email", emailSchema);