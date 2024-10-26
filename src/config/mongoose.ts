import mongoose from "mongoose";

mongoose.connection.on("Error", (err) => {
    console.error("Error en la conexión a MongoDB: " + err);
});

mongoose.connection.on("disconected", () => {
    console.warn("Conexion a MongoDB cerrada");
});

export const configuration = {
    MONGO_URI: process.env.BD_DBCONNECTION,
};

export default mongoose;
