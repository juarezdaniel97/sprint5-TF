import CountriesRepository from "../repository/CountriesRepository.mjs";

export const getAllService = async () => {
    return await CountriesRepository.getAll()
}