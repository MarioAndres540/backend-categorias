import { config } from "dotenv";
import { Request, Response } from "express";
import Theme from "../models/themeModel";
import ThemesRepository from "../data/ThemeRepository";

config();

export default class ThemeController {
    static async getAllThemes(req: Request, res: Response) {
        try {
            const themes = (await ThemesRepository.getAll()) || [];

            if (themes.length > 0) {
                const jsonResponse = {
                    status: 200,
                    message: "All themes",
                    results: themes,
                };

                return res.status(jsonResponse.status).json(jsonResponse);
            } else {
                const jsonResponse = {
                    status: 204,
                    message: "No hay temas",
                    results: themes,
                };

                return res.status(jsonResponse.status).json(jsonResponse);
            }
        } catch (error) {
            const msg: string = "Error al lista los temas";
            return res.status(500).json({
                msg,
            });
        }
    }

    static async listTheme(req: Request, res: Response) {
        try {
            const { idTheme } = req.body;

            if (!idTheme) {
                return res
                    .status(400)
                    .json({ msg: "No hay una cuenta a buscar" });
            }
            const themes = await ThemesRepository.findOne(idTheme);

            if (themes) {
                const jsonResponse = {
                    status: 200,
                    message: "All themes",
                    results: themes,
                };

                return res.status(jsonResponse.status).json(jsonResponse);
            }
        } catch (error: any) {
            const msg: string = "Error al listar el tema";
            return res.status(500).json({
                msg,
                error: error.message,
            });
        }
    }

    static async createTheme(req: Request, res: Response) {
        try {
            const { name, dateCreation } = req.body;

            if (!name || !dateCreation) {
                return res
                    .status(400)
                    .json({ msg: "Nombre y fecha de creación requeridos" });
            }

            const nameTheme = name;
            const dateCreationTheme = dateCreation;
            const activeTheme = true;

            const newTheme = await ThemesRepository.create(
                nameTheme,
                activeTheme,
                dateCreationTheme
            );

            if (newTheme) {
                const jsonResponse = {
                    status: 201,
                    message: "Tema creado con éxito",
                    results: newTheme,
                };

                return res.status(jsonResponse.status).json(jsonResponse);
            }
        } catch (error: any) {
            const msg: string = "Error al crear el temas";
            return res.status(500).json({
                msg,
                error: error.message,
            });
        }
    }

    static async editTheme(req: Request, res: Response) {
        try {
            const { id, name, active } = req.body;

            if (!id || !name || active === undefined) {
                return res
                    .status(400)
                    .json({ msg: "ID, nombre y estado activo son requeridos" });
            }

            const nameTheme = name;
            const activeTheme = active;
            const idTheme = id;

            const updateTheme = await ThemesRepository.editTheme(
                idTheme,
                nameTheme,
                activeTheme
            );

            if (updateTheme) {
                return res.status(200).json({
                    status: 200,
                    message: "Tema editado con éxito",
                    results: updateTheme,
                });
            } else {
                return res.status(404).json({ msg: "Tema no encontrado" });
            }
        } catch (error: any) {
            const msg: string = "Error al editar el temas";
            return res.status(500).json({
                msg,
                error: error.message,
            });
        }
    }

    static async deleteTheme(req: Request, res: Response) {
        try {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({ msg: "ID de tema requerido" });
            }

            const idTheme = id;

            const deleteTheme = await ThemesRepository.deleteTheme(idTheme);

            if (deleteTheme) {
                const jsonResponse = {
                    status: 201,
                    message: "Tema eliinado con éxito",
                    results: deleteTheme,
                };

                return res.status(jsonResponse.status).json(jsonResponse);
            } else {
                return res.status(404).json({ msg: "Tema no encontrado" });
            }
        } catch (error: any) {
            const msg: string = "Error al eliminar el tema";
            return res.status(500).json({
                msg,
                error: error.message,
            });
        }
    }
}
