import mongoose from "mongoose";
import IRepository from "./IRepository.mjs";
import Countries from "../models/Countries.mjs";


class CountriesRepository extends IRepository{

    async getAll(){
        return await Countries.find({});
    }
}

export default new CountriesRepository();