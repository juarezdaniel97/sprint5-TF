import express from 'express';
import {
    proccessAndSaveCountries,
    getAllController
} from '../controller/CountriesController.mjs';

const router = express.Router();


router.get('/process-countries', proccessAndSaveCountries);
router.get('/countries', getAllController);

export default router;