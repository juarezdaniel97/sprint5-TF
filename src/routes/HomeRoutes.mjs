import express from 'express';
import { getAllController } from '../controller/CountriesController.mjs';

const router = express.Router();

router.get('/', getAllController);

export default router;

