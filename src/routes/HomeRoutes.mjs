import express from 'express';
import { getAllController } from '../controller/CountriesController.mjs';

const router = express.Router();

// router.get('/',(req, res)=>{
//     res.render('dashboard', {title: "Gestión de Países"});
// })

router.get('/', getAllController);

export default router;

