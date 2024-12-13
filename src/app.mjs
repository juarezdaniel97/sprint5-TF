
import {config} from "dotenv";
import express from 'express';
import {connectionDB} from './config/dbConfig.mjs';
import countriesRouter from "./routes/CountriesRoutes.mjs";


//Cargar las variables de entorno.
//config();
config({path:'../.env'})

//console.log(process.env.NOMBRE); // salida: daniel juarez

//Configurar BD
connectionDB();


const app = express();
const PORT = process.env.PORT || 3000;

//MIDDLEWARE
app.use(express.json());


//Para archivos estáticos
app.use(express.static('public'));

app.use('/api', countriesRouter);


//Iniciar el servidor
app.listen(PORT, ()=>{
    console.log(`Servidor se está ejecutando http://localhost:${PORT}`);
});