import { 
    fetchAllCountries,
    getAllService,
    createCountriesService

} from '../services/CountriesServices.mjs';

import {filterCountriesAPI} from '../public/js/filterAPI.mjs';




export const proccessAndSaveCountries = async (req, res) =>{
    try {
        const countries = await fetchAllCountries();
        const countries_filter = filterCountriesAPI(countries);

        //GUARDAR DATOS -> Llamar al método que crea Paises
        await createCountriesService(countries_filter[0]);

        res.status(200).json({
            message: "Paises procesados y almacenados exitosamente",
            count: countries_filter.length,
            data: countries_filter
        });

    } catch (error) {
        console.error("Error al procesar los paises: ", error.message);
        res.status(500).json({error: "Hubo un problema al procesar los datos."})
    }
}

export const getAllController = async (req, res) => {
    try {
        const datos = await getAllService();

        res.send({data: datos});

    } catch (error) {
        res.status(500).send('Error al obtener todos los datos')
    }
}