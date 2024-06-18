const mongoose = require('mongoose');
const { Schema } = mongoose;

let jewllery = new Schema({
    upload: [
        {
            client_id: {
                type: String,
                require: true
            },
            url: {
                type: String,
                require: true
            }
        }
    ],
    name: { type: String },
    price: { type: Number },
    description: { type: String },
    discount: { type: String },
    material: { type: String },
    category: { type: String },
    gender: { type: String },
    gross_weight: { type: String },
    net_weight: { type: String }
}, {
    collection: 'jewllery'
});

module.exports = mongoose.model('jewllery', jewllery);