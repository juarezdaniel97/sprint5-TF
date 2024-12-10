import { getAllService } from '../services/CountriesServices.mjs';

export const getAllController = async (req, res) => {
    try {
        const datos = await getAllService();

        res.send({data: datos});

    } catch (error) {
        res.status(500).send('Error al obtener todos los datos')
    }
}