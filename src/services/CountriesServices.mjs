import CountriesRepository from "../repository/CountriesRepository.mjs";
import axios from "axios";


export const getAllService = async () => {
    return await CountriesRepository.getAll()
}

export const createCountriesService = async (datos) => {
    return await CountriesRepository.create(datos);
}

const api = "https://restcountries.com/v3.1/all";
const api_spanish = "https://restcountries.com/v3.1/lang/spanish";


export const fetchAllCountries = async () => {
    console.log('Iniciando la solicitud a  la API');
    
    try {
        const response = await fetch(api_spanish);
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
const api = "https://restcountries.com/v3.1/all";
const api_spanish = "https://restcountries.com/v3.1/lang/spanish";

export const fetchAllCountries = async () => {
    try {
        const response = await axios.get(api, {
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
