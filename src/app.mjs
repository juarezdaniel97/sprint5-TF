
import {config} from "dotenv";
import express from 'express';
import {connectionDB} from './config/dbConfig.mjs';

//Cargar las variables de entorno.
config();

//console.log(process.env.NOMBRE); // salida: daniel juarez

//Configurar BD
connectionDB();


const app = express();
const PORT = process.env.PORT || 3000;




//Iniciar el servidor
app.listen(PORT, ()=>{
    console.log(`Servidor se está ejecutando http://localhost:${PORT}`);
});