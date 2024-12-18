import express from 'express';
import {
    proccessAndSaveCountries,
    viewAddController,
    getAllController,
    addCountryController,
    getCountryByIdController,
    updateCountryController,
    deleteCountryController,
    deleteAllCountriesController
} from '../controller/CountriesController.mjs';

import { validationErrorHandler } from '../middleware/errorHandler.mjs';
import { 
    validateNameCountry,
    validateCapitalCountry,
    validateBordersCountry,
    validateAreaCountry,
    validatePopulationCountry,
    validateGiniCountry

} from '../validators/CountryValidator.mjs'

const router = express.Router();

//RUTA PARA OBTENER DATOS DE LA API
router.get('/process-countries', proccessAndSaveCountries);

//RUTA PARA OBTENER TODOS LOS PAISES DE LA BD
router.get('/countries', getAllController);

//RUTA PARA ELIMINAR TODOS LOS PAISES DE LA BD
router.delete('/countries', deleteAllCountriesController);

//RUTA PARA MOSTRAR VISTA DE AGREGAR
router.get('/addCountry', viewAddController);

//RUTA PARA AGREGAR UN NUEVO PAÍS
router.post('/country', 
    [
        validateNameCountry,
        validateCapitalCountry,
        validateBordersCountry,
        validateAreaCountry,
        validatePopulationCountry,
        validateGiniCountry
    ], validationErrorHandler, addCountryController);

//RUTA PARA OBTENER UN PAÍS
router.get('/country/:id', getCountryByIdController)

//RUTA PARA MODIFICAR UN PAÍS
router.put('/country/:id',
    [
        validateNameCountry,
        validateCapitalCountry,
        validateBordersCountry,
        validateAreaCountry,
        validatePopulationCountry,
        validateGiniCountry
    ],validationErrorHandler,updateCountryController);

//RUTA PARA ELIMINAR UN PAÍS
router.delete('/country/:id', deleteCountryController);


export default router;