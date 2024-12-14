import mongoose from "mongoose";

const countriesSchema = new mongoose.Schema({
    name: {
        common: { type: String, required: true },
        official: { type: String, required: true },
        nativeName: {
            grn: {
                official: { type: String },
                common: { type: String }
            },
            spa: {
                official: { type: String },
                common: { type: String }
            }
        }
    },
    independent: { type: Boolean, required: true },
    status: { type: String },
    unMember: { type: Boolean },
    currencies: {
        ARS: {
            name: { type: String },
            symbol: { type: String }
        }
    },
    capital: [{ type: String }],
    region: { type: String, required: true },
    subregion: { type: String },
    languages: {
        grn: { type: String },
        spa: { type: String }
    },
    latlng: [{ type: Number }],
    landlocked: { type: Boolean },
    borders: [{ type: String }],
    area: { type: Number },
    flag: { type: String },
    maps: {
        googleMaps: { type: String },
        openStreetMaps: { type: String }
    },
    population: { type: Number },
    /*gini: {
        "2019": { type: Number }
    },*/
    gini: {
        [String]: { type: Number }
    },
    fifa: { type: String },
    timezones: [{ type: String }],
    continents: [{ type: String }],
    flags: {
        png: { type: String },
        svg: { type: String },
        alt: { type: String }
    },
    startOfWeek: { type: String },
    capitalInfo: {
        latlng: [{ type: Number }]
    },
    creador: { type: String, default: "Daniel Juarez" },
    type: { type: String, default: "Country" }

}, { collection: 'Grupo-13' });

export default mongoose.model('Countries', countriesSchema);