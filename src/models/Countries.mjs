import mongoose from "mongoose";

const countriesSchema = new mongoose.Schema({
    createdAt: {type: Date, default: Date.now} ,
    autor: {type: String, default: 'Daniel Juarez'}
},{collection: 'Grupo-13'});

export default mongoose.model('Countries', countriesSchema);