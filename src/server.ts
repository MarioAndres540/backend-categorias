import express from "express";
import cors from "cors";
import corsOptions from "./config/cors.json";
import bodyParser from "body-parser";
import morgan from "morgan";
import "dotenv/config";
import mongoose, { configuration } from "./config/mongoose";
import { RequestHandler } from "express";
import routes from "./routes";

export default class Server {
    static async start() {
        require("dotenv").config();

        const port = process.env.PORT;

        const app = this.configExpressApp();

        try {
            await mongoose.connect(<string>configuration.MONGO_URI);
            console.log("Conectado a la base de datos");
            app.listen(port, () => {
                console.log("Escuchando peticiones en el purto: ", port);
            });
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    private static configExpressApp() {
        const app = express();

        app.use(cors(corsOptions));
        app.use(morgan("dev"));

        app.use(
            bodyParser.urlencoded({
                limit: "10000kb",
                extended: true,
            }) as RequestHandler
        );

        app.use(bodyParser.json({ limit: "10000kb" })) as RequestHandler;
        app.use("/", routes);

        return app;
    }
}
