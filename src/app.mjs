
import { config } from "dotenv";
import express from 'express';
import { connectionDB } from './config/dbConfig.mjs';
import countriesRouter from "./routes/CountriesRoutes.mjs";
import homeRouter from './routes/HomeRoutes.mjs';
import expressEjsLayouts from "express-ejs-layouts";
import methodOverride from 'method-override';


//SE CARGA LAS VARIABLES DE ENTORNO.
config({ path: '../.env' })


const app = express();
const PORT = process.env.PORT || 3000;

//MIDDLEWARE
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './view');


//Configuración Express-ejs-layout
app.use(expressEjsLayouts);


//MÉTODO PARA lA BD
connectionDB();

//CONFIGURACIÓN PARA ARCHIVO ESTÁTICOS
app.use(express.static('public'));

//CONFIGUACIÓN PARA SOBREESCRIBIR MÉTODOS (delete)
app.use(methodOverride('_method')); // Sobrescribe métodos con ?_method=DELETE

app.use('/', homeRouter);
app.use('/api', countriesRouter);
app.use((req, res, next) => {
    res.status(404).render('errors/404',{ title: '404 - Página no encontrada', message: "LA PÁGINA QUE BUSCA NO EXISTE O FUE MOVIDA."});
});




//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor se está ejecutando http://localhost:${PORT}`);
});