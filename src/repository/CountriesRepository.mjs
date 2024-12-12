import mongoose from "mongoose";
import IRepository from "./IRepository.mjs";
import Countries from "../models/Countries.mjs";


class CountriesRepository extends IRepository{

    async getAll(){
        return await Countries.find({});
    }

    async create(datos){
        try {
            const countries = new Countries(datos);
            return await countries.save();

        } catch (error) {
            console.log(error);
            
            throw new Error("Error al agregar un Pais: ");
        }
    }
}

export default new CountriesRepository();