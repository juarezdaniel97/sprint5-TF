import CountriesRepository from "../repository/CountriesRepository.mjs";


export const fetchAllCountries = async () => {
    try {
        let response = await fetch(process.env.URL_API_ALL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json();

        return data;
    } catch (error) {
        console.log('Error al obtener los datos: ', error.message);
    } 
};

export const saveCountries_API_BD_service = async (countries) => {
    return await CountriesRepository.saveCountries_of_API(countries);
}

export const getCountryByIdService = async (id) =>{
    return await CountriesRepository.getFindById(id);
}

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

export const deleteAllCountriesService = async () =>{
    return await CountriesRepository.deleteAll();
}



