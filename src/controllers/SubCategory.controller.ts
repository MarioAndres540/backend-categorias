import { config } from "dotenv";
import { Request, Response } from "express";
import Theme from "../models/themeModel";
import SubCategoryRespository from "../data/SubCategoryRepository";

config();

export default class SubCategoryController {
    static async getAllSubCategory(req: Request, res: Response) {
        try {
            const subCategory = (await SubCategoryRespository.getAll()) || [];

            if (subCategory.length > 0) {
                const jsonResponse = {
                    status: 200,
                    message: "All themes",
                    results: subCategory,
                };

                return res.status(jsonResponse.status).json(jsonResponse);
            } else {
                const jsonResponse = {
                    status: 204,
                    message: "No hay temas",
                    results: subCategory,
                };

                return res.status(jsonResponse.status).json(jsonResponse);
            }
        } catch (error) {
            const msg: string = "Error al lista las sub categorias";
            return res.status(500).json({
                msg,
            });
        }
    }

    static async listSubCategory(req: Request, res: Response) {
        try {
            const { idSubCategory } = req.body;

            if (!idSubCategory) {
                return res
                    .status(400)
                    .json({ msg: "No hay una sub categoria a buscar" });
            }
            const SubCategory = await SubCategoryRespository.findOne(
                idSubCategory
            );

            if (SubCategory) {
                const jsonResponse = {
                    status: 200,
                    message: "All SubCategory",
                    results: SubCategory,
                };

                return res.status(jsonResponse.status).json(jsonResponse);
            }
        } catch (error) {
            const msg: string = "Error al listar la subcategoria";
            return res.status(500).json({
                msg,
            });
        }
    }

    static async createSubCategory(req: Request, res: Response) {
        try {
            const { name, dateCreation, theme } = req.body;

            if (!name || !dateCreation || theme) {
                return res
                    .status(400)
                    .json({ msg: "Nombre y fecha de creación requeridos" });
            }

            const nameSubCategory = name;
            const dateCreationTheme = dateCreation;
            const activeSubcategory = true;
            const nameTheme = theme;

            const newTheme = await SubCategoryRespository.create(
                nameSubCategory,
                activeSubcategory,
                dateCreationTheme,
                nameTheme
            );

            if (newTheme) {
                const jsonResponse = {
                    status: 201,
                    message: "sub categoria creada con éxito",
                    results: newTheme,
                };

                return res.status(jsonResponse.status).json(jsonResponse);
            }
        } catch (error) {
            const msg: string = "Error al lista las subcategorias";
            return res.status(500).json({
                msg,
            });
        }
    }

    static async editSubCategory(req: Request, res: Response) {
        try {
            const { id, name, active, theme } = req.body;

            if (!id || !name || active === undefined || !theme) {
                return res
                    .status(400)
                    .json({ msg: "ID, nombre y estado activo son requeridos" });
            }

            const nameSubCategory = name;
            const activeTheme = active;
            const idSubCategory = id;
            const themeSubcategory = theme;

            const updateSubCategory =
                await SubCategoryRespository.editSubcategory(
                    idSubCategory,
                    nameSubCategory,
                    activeTheme,
                    themeSubcategory
                );

            if (updateSubCategory) {
                return res.status(200).json({
                    status: 200,
                    message: "Sub categoria editada con éxito",
                    results: updateSubCategory,
                });
            } else {
                return res.status(404).json({ msg: "Tema no encontrado" });
            }
        } catch (error) {
            const msg: string = "Error al editar la sub categoria";
            return res.status(500).json({
                msg,
            });
        }
    }

    static async deleteSubCategory(req: Request, res: Response) {
        try {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({ msg: "ID de tema requerido" });
            }

            const idSubCategory = id;

            const deleteSubCategory =
                await SubCategoryRespository.deleteSubcategory(idSubCategory);

            if (deleteSubCategory) {
                const jsonResponse = {
                    status: 201,
                    message: "Tema eliinado con éxito",
                    results: deleteSubCategory,
                };

                return res.status(jsonResponse.status).json(jsonResponse);
            } else {
                return res.status(404).json({ msg: "Tema no encontrado" });
            }
        } catch (error) {
            const msg: string = "Error al eliminar el sub categoria";
            return res.status(500).json({
                msg,
            });
        }
    }
}
