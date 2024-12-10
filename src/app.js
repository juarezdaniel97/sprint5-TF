
import express from 'express';


const app = express();
const PORT = 3000;




//Iniciar el servidor
app.listen(PORT, ()=>{
    console.log(`Servidor se está ejecutando http://localhost:${PORT}`);
});