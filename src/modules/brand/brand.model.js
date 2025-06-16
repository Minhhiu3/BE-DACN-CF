import mongoose, { Schema } from "mongoose";
// Table Brand{
//   id string
//   title string
//   logoUrl string
//   description string
//   slug string
//   deletedAt datetime [default: null]
// }
const brandModel = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    logoUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
    versionKey: false
})
const brand = mongoose.model('brand', brandModel);
export default brand;