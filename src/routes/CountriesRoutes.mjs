import express from 'express';
import {
    proccessAndSaveCountries,
    viewAddController,
    getAllController,
    addCountryController,
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

router.get('/process-countries', proccessAndSaveCountries);
router.get('/addCountry', viewAddController);

router.get('/countries', getAllController);
router.post('/country', 
    [
        validateNameCountry,
        validateCapitalCountry,
        validateBordersCountry,
        validateAreaCountry,
        validatePopulationCountry,
        validateGiniCountry
    ], validationErrorHandler, addCountryController);
router.put('/country/:id',
    [
        validateNameCountry,
        validateCapitalCountry,
        validateBordersCountry,
        validateAreaCountry,
        validatePopulationCountry,
        validateGiniCountry
    ],validationErrorHandler,updateCountryController);
router.delete('/country/:id', deleteCountryController);
router.delete('/countries', deleteAllCountriesController);

export default router;