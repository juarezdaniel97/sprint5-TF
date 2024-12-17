
import { config } from "dotenv";
import express from 'express';
import { connectionDB } from './config/dbConfig.mjs';
import countriesRouter from "./routes/CountriesRoutes.mjs";
import homeRouter from './routes/HomeRoutes.mjs';
import expressEjsLayouts from "express-ejs-layouts";

//Cargar las variables de entorno.
//config();
config({ path: '../.env' })

//console.log(process.env.NOMBRE); // salida: daniel juarez


const app = express();
const PORT = process.env.PORT || 3000;

//MIDDLEWARE
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './view');

//Configuración Express-ejs-layout
app.use(expressEjsLayouts);

//Configurar BD
connectionDB();

//Para archivos estáticos
app.use(express.static('public'));




app.use('/', homeRouter);
app.use('/api', countriesRouter);
app.use((req, res, next) => {
    res.status(404).render('errors/404',{ title: '404 - Página no encontra' });
    //res.status(200).render('confirms/confirm',{ title: 'Página de Confirmación' });
});




//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor se está ejecutando http://localhost:${PORT}`);
});