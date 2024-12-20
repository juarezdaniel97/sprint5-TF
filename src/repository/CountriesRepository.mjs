import mongoose from "mongoose";
import IRepository from "./IRepository.mjs";
import Countries from "../models/Countries.mjs";


class CountriesRepository extends IRepository {

    async getAll() {
        //Puedo filtrar por el campo name, common, creador, etc
        //Me parece más práctico añadirle un campo de type y filtrar por tipo (Country o SuperHero)
        return await Countries.find({ type: "Country" });
    }

    async saveCountries_of_API(countries) {
        try {
                Countries.create(countries);
                console.log('PAISES GUARDADOS EN BD..');

        } catch (error) {
            console.error('ERROR AL GUARDAR PAISES EN LA BASE DE DATOS:', error);
            throw error;
        }
    }

    async getFindById(id){
        return Countries.findById(id);
    }

    async create(datos) {
        try {
            const countries = new Countries(datos);
            return await countries.save();

        } catch (error) {
            console.log(error);

            throw new Error("Error al agregar un Pais: ");
        }
    }

    async update(id, datos) {
        const documentUpdate = await Countries.findByIdAndUpdate(id, datos, { new: true });

        if (!documentUpdate) {
            throw new Error("País no encontrado!");
        }

        return documentUpdate
    }

    async deleteById(id) {
        return await Countries.findByIdAndDelete(id);
    }

    async deleteAll(){
        return await Countries.deleteMany({type: "Country"})
    }
}

export default new CountriesRepository();