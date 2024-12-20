import {
    fetchAllCountries,
    getAllService,
    getCountryByIdService,
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
        const countries_filter = filterCountriesAPI(countries);

        //Guardar en la BD
        await saveCountries_API_BD_service(countries_filter);

        res.status(200).render('confirms/success', {title: 'Página de éxito' , message: `SE OBTUVIERON UN TOTAL DE ${countries.length} PAISES, Y SE PROCESARON Y ALMACENARON ${countries_filter.length}` });

    } catch (error) {
        console.error("Error al procesar los paises: ", error.message);
        res.status(500).render('errors/500',{ title: '500 - Error del Servidor', message: "HUBO UN ERROR AL PROCESAR LOS DATOS DE LA API" });
    }
}

export const viewAddController = async (req, res) => {
    res.render('addCountry', { title: 'Agregar Pais' });
}

export const viewConfirmController = async (req, res) => {
    res.render('confirms/confirm', {title: 'Página de Confirmación'})
}

export const getCountryByIdController = async (req, res) => {
    
    const {id} = req.params;

    const countryFound = await getCountryByIdService(id);
    
    if (countryFound) {
        
        const country = {...countryFound.toObject()}

        //Convierte el Objeto MAP en Objeto plano
        country.gini = Object.fromEntries(country.gini);

        res.render('editCountry', {title: 'Modificar País', country});

    }else{
        res.status(500).render('errors/500',{ title: '500 - Error del Servidor', message: "¡EL PAÍS INGRESADO NO SE HA PODIDO ENCONTRAR!" });
    }
}

export const getAllController = async (req, res) => {
    try {

        const data = await getAllService();

        const statistics = calculosCounties(data);

        const countries = data.map(country => ({
            ...country.toObject(),
            gini: country.gini ? Object.fromEntries(country.gini) : null 
        }));

        //toObject() convierte un documento de MongoDB a un objeto JavaScript plano
        //Object.fromEntries() convierte el tipo Map en un objeto plano
        //console.log(country.gini); // { '2024': 40.9, '2023': 10.5 }

        res.render('dashboard', {title: "Gestión de Paises", countries, statistics});

    } catch (error) {
        console.error(`Error al obtener todos los paises ${error}`);
        res.status(500).render('errors/500',{ title: '500 - Error del Servidor', message: "¡ERROR AL OBTENER TODOS LOS PAISES!" });
    }
}

export const addCountryController = async (req, res) => {
    try {
        const data = req.body;
        const newCountry = await createCountriesService(data);
        res.status(201).json({ message: 'País agregado exitosamente', data: newCountry });
        
    } catch (error) {
        console.error(`Error al agregar el país ${error.message }`);
        res.status(500).render('errors/500',{ title: '500 - Error del Servidor', message: "¡ERROR AL AGREGAR EL PAÍS!" });
    }
}

export const updateCountryController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const updateCountry = await updateCountryService(id, data);

        res.status(200).json({ message: 'País actualizado exitosamente', data: updateCountry });

    } catch (error) {
        console.error(`Error al actualizar el país ${error.message }`);
        res.status(500).render('errors/500',{ title: '500 - Error del Servidor', message: "¡ERROR AL ACTUALIZAR EL PAÍS!" });
    }
}

export const deleteCountryController = async (req, res) => {
    try {
        const { id } = req.params;
        const country = await deleteCountryService(id);

        if (country) {
            res.status(200).render('confirms/success', { title: 'Página de éxito', message: "¡EL PAÍS SE ELIMINÓ CORRECTAMENTE!" });
        } else {
            res.status(400).render('errors/500',{ title: '500 - Error del Servidor', message: "¡EL PAÍS INGRESADO NO SE HA PODIDO ENCONTRAR!" });
        }
    } catch (error) {
        consele.error(`Error al eliminar el país: ${error.message}`)
        res.status(500).render('errors/500',{ title: '500 - Error del Servidor', message: "¡ERROR AL ELIMINAR UN PAÍS!" });
    }
}

export const deleteAllCountriesController = async (req, res) => {
    try {
        const countries = await deleteAllCountriesService();
        
        if (countries) {
            res.redirect('/');
        }

    } catch (error) {
        consele.error(`Error al eliminar todos los paises: ${error.message}`)
        res.status(500).render('errors/500',{ title: '500 - Error del Servidor', message: "¡ERROR AL ELIMINAR TODOS LOS PAISES!" });
    }
}