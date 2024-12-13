import {
    fetchAllCountries,
    getAllService,
    createCountriesService,
    updateCountryService,
    deleteCountryService

} from '../services/CountriesServices.mjs';

import { filterCountriesAPI } from '../public/js/filterAPI.mjs';




export const proccessAndSaveCountries = async (req, res) => {
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
        res.status(500).json({ error: "Hubo un problema al procesar los datos." })
    }
}

export const getAllController = async (req, res) => {
    try {
        const datos = await getAllService();

        res.send({ count: datos.length ,data: datos });

    } catch (error) {
        res.status(500).send('Error al obtener todos los datos')
    }
}

export const addCountryController = async (req, res) => {
    try {
        const data = req.body;
        const newCountries = await createCountriesService(data);
        res.status(201).json({ message: 'Pa+is agregado exitosamente', data: newCountries });

    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el país', error: error.message });
    }
}

export const updateCountryController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const updateCountry = await updateCountryService(id, data);

        res.status(200).json({ message: 'País actualizado exitosamente', data: updateCountry });

    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el país', error: error.message });
    }
}

export const deleteCountryController = async (req, res) => {
    try {
        const { id } = req.params;
        const country = await deleteCountryService(id);

        if (country) {
            res.send('¡País eliminado correctamente!');
        } else {
            res.status(400).json({ message: 'País no encontrado.' })
        }
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el país.', error: error.message });
    }
} 