import CountriesRepository from "../repository/CountriesRepository.mjs";
import axios from 'axios';


export const getAllService = async () => {
    return await CountriesRepository.getAll()
}

export const createCountriesService = async (datos) => {
    return await CountriesRepository.create(datos);
}

export const updateCountryService = async (id, datos) => {
    return await CountriesRepository.update(id, datos);
}

export const deleteCountryService = async (id) => {
    return await CountriesRepository.deleteById(id);
}


export const fetchAllCountries = async () => {
    /* try {
        let response = await fetch(process.env.URL_API_SPANISH);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json();

        return data;
    } catch (error) {
        console.log('Error al obtener los datos: ', error.message);
    } */

        try {
            const response = await axios.get("https://restcountries.com/v3.1/all", {
                timeout: 10000, // 10 segundos
            });
            
            return response.data; // Devuelve los datos obtenidos

        } catch (error) {
            console.error('Error al obtener la lista de países:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
                config: error.config
            });
            throw error;
        }
        
};



// Consumo y devuelvo los países

/*
async function getCountries() {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        return response.data;

    } catch (error) {
        console.error('Error al obtener la lista de países:', error);
        throw error;
    }
}*
/

/*
export const fetchAllCountries = async () => {
    const data = await getCountries();
    return data;
}
*/
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

export const mostrarPaises = async () => {
    try {
        const paises = await fetchAllCountries(); // Llamada a la función getCountries
        
        // Ejemplo: Mostrar la cantidad de países
        console.log(`Número total de países: ${paises.length}`);
        
        // Ejemplo: Mostrar los nombres de los primeros 10 países
        console.log('Primeros 10 países:');
        paises.slice(0, 10).forEach((pais, index) => {
            console.log(`${index + 1}. ${pais.name.common}`);
        });
        
        
    } catch (error) {
        console.error('Error al procesar la lista de países:', error.message);
    }
};