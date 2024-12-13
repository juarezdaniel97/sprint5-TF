import express from 'express';
import {
    proccessAndSaveCountries,
    getAllController,
    addCountryController,
    updateCountryController,
    deleteCountryController
} from '../controller/CountriesController.mjs';

const router = express.Router();

router.get('/process-countries', proccessAndSaveCountries);
router.get('/countries', getAllController);
router.post('/country', addCountryController);
router.put('/country/:id', updateCountryController);
router.delete('/country/:id', deleteCountryController);

export default router;