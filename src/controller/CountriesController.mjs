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

        /*res.status(200).json({
            message: "Paises procesados y almacenados exitosamente",
            count_total: countries.length,
            count_filter: countries_filter.length,
        });*/
        res.status(200).render('confirms/success', {title: 'Página de éxito' , message: `SE OBTUVIERON ${countries.length} PAISES. SE PROCESARON Y ALMACENARON ${countries_filter.length}` });

    } catch (error) {
        console.error("Error al procesar los paises: ", error.message);
        res.status(500).json({ error: "Hubo un problema al procesar los datos." })
        //res.status(500).render('errors/500',{ title: '500 - Error del Servidor', message: "HUBO UN ERROR AL PROCESAR LOS DATOS" });
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
        
        //res.status(200).json({message: 'Encontrado', data: country});
        const country = {...countryFound.toObject()}

        //Convierte el Objeto MAP en Objeto plano
        country.gini = Object.fromEntries(country.gini);

        res.render('editCountry', {title: 'Modificar País', country});
        //res.render('modificar', {title: 'Modificar País', country});
        
    }else{
        res.send('No encontrado')
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

        //El método Object.fromEntries --> convierte el Map en un objeto plano
        //console.log(country.gini); // { '2024': 40.9, '2023': 10.5 }

        res.render('dashboard', {title: "Gestión de Paises", countries, statistics});
        //res.render('index', { title: "Gestión de Paises", countries, statistics });

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
        //res.status(200).json({ message: 'País actualizado exitosamente', data });

    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el país', error: error.message });
    }
}

export const deleteCountryController = async (req, res) => {
    try {
        const { id } = req.params;
        const country = await deleteCountryService(id);

        if (country) {
            //res.send('¡País eliminado correctamente!');
            res.status(200).render('confirms/success', { title: 'Página de éxito', message: "¡EL PAÍS SE ELIMINÓ CORRECTAMENTE!" });
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
            //res.send('Paises eliminados correctamente!');
            res.redirect('/');
        }

    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar todos los paises.', error: error.message })
    }
}