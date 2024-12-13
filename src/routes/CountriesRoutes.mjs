import express from 'express';
import {
    proccessAndSaveCountries,
    getAllController,
    addCountryController,
    updateCountryController,
    deleteCountryController
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

export default router;