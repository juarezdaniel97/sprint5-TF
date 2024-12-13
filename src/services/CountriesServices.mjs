import CountriesRepository from "../repository/CountriesRepository.mjs";
import axios from "axios";


export const getAllService = async () => {
    return await CountriesRepository.getAll()
}

export const createCountriesService = async (datos) => {
    return await CountriesRepository.create(datos);
}

export const updateCountryService = async (id, datos) => {
    return await CountriesRepository.update(id, datos);
}

export const deleteCountryService = async (id) =>{
    return await CountriesRepository.deleteById(id);
} 


export const fetchAllCountries = async () => {    
    try {
        const response = await fetch(process.env.URL_API_SPANISH);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error al consumir la API de países:", error.message);
        throw new Error("No se pudo obtener la lista de países");
    }
};


/*
export const fetchAllCountries = async () => {
    try {
        const response = await axios.get(process.env.URL_API_ALL, {
            timeout: 50000, // Tiempo de espera en milisegundos
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        });
        return response.data;

    } catch (error) {
        console.error("Error al consumir la API de países:", {
            message: error.message,
            code: error.code,
            config: error.config,
        });
        throw new Error("No se pudo obtener la lista de países");
    }
};
*/
