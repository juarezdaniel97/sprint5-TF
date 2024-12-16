import {
    fetchAllCountries,
    getAllService,
    createCountriesService,
    updateCountryService,
    deleteCountryService,
    saveCountries_API_BD_service,
    deleteAllCountriesService

} from '../services/CountriesServices.mjs';

import { filterCountriesAPI } from '../public/js/filterAPI.mjs';

import { calculosCounties } from '../public/js/calculosEstadisticos.mjs'



export const proccessAndSaveCountries = async (req, res) => {
    try {
        const countries = await fetchAllCountries();
        const countries_filter =  filterCountriesAPI(countries);

        //Guardar en la BD
        await saveCountries_API_BD_service(countries_filter);

        res.status(200).json({
            message: "Paises procesados y almacenados exitosamente",
            count_total: countries.length,
            count_filter: countries_filter.length,
        });

    } catch (error) {
        console.error("Error al procesar los paises: ", error.message);
        res.status(500).json({ error: "Hubo un problema al procesar los datos." })
    }
}

export const viewAddController = async (req, res) => {
    res.render('addCountry', {title: 'Agregar Pais'});
}

export const getAllController = async (req, res) => {
    try {
        
        const data = await getAllService();
        
        const statistics = calculosCounties(data);
        
        const countries = data.map(country => ({
            ...country.toObject(),
            gini: country.gini ? Object.fromEntries(country.gini) : null
        }));

        res.render('dashboard', {title: "Gestión de Paises", countries, statistics});
        
    } catch (error) {
        res.status(500).send('Error al obtener todos los datos')
    }
}

export const addCountryController = async (req, res) => {
    try {
        const data = req.body;
        const newCountries = await createCountriesService(data);
        res.status(201).json({ message: 'País agregado exitosamente', data: newCountries });

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

export const deleteAllCountriesController = async (req, res) => {
    try {
        const countries = await deleteAllCountriesService();
        console.log(countries);

        if (countries) {
            res.send('Paises eliminados correctamente!');
        }

    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar todos los paises.', error: error.message })
    }
}