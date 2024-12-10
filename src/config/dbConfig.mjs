import { mongoose } from "mongoose";

export const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Conexión exitosa a MongoBD');

    } catch (error) {
        console.log('Error al conectar a MongoBD:', error.message);
        process.exit(1);
    }
}