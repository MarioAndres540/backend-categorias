import { config } from "dotenv";
import { Request, Response } from "express";
import Theme from "../models/themeModel";
import CategoryRepository from "../data/CategoryRepository";
import Subcategory from "../models/SubCategoryModel";
import Category from "../models/CategoryModel";

config();
export default class CategoryController {
    static async getAllCategory(req: Request, res: Response) {
        try {
            const Category = (await CategoryRepository.getAll()) || [];

            if (Category.length > 0) {
                const jsonResponse = {
                    status: 200,
                    message: "All Category",
                    results: Category,
                };

                return res.status(jsonResponse.status).json(jsonResponse);
            } else {
                const jsonResponse = {
                    status: 204,
                    message: "No hay Categorias",
                    results: Category,
                };

                return res.status(jsonResponse.status).json(jsonResponse);
            }
        } catch (error) {
            const msg: string = "Error al listar las  categorias";
            return res.status(500).json({
                msg,
            });
        }
    }

    static async listCategory(req: Request, res: Response) {
        try {
            const { id } = req.body;

            if (!id) {
                return res
                    .status(400)
                    .json({ msg: "No hay una sub categoria a buscar" });
            }
            const Category = await CategoryRepository.findOne(id);

            if (Category) {
                const jsonResponse = {
                    status: 200,
                    message: "All SubCategory",
                    results: Category,
                };

                return res.status(jsonResponse.status).json(jsonResponse);
            }
        } catch (error) {
            const msg: string = "Error al listar las categorias";
            return res.status(500).json({
                msg,
            });
        }
    }

    static async createCategory(req: Request, res: Response) {
        try {
            const { name, dateCreation, subCategory } = req.body;

            if (!name || !dateCreation || subCategory) {
                return res
                    .status(400)
                    .json({ msg: "Falta dato para la  creación requeridos" });
            }

            const nameCategory = name;
            const dateCreationTheme = dateCreation;
            const activeCategory = true;
            const namesubCategory = subCategory;

            const newTheme = await CategoryRepository.create(
                nameCategory,
                activeCategory,
                dateCreationTheme,
                namesubCategory
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
            const msg: string = "Error al crear las Categorias";
            return res.status(500).json({
                msg,
            });
        }
    }

    static async editCategory(req: Request, res: Response) {
        try {
            const { id, name, active, subCategory } = req.body;

            if (!id || !name || active === undefined || !subCategory) {
                return res.status(400).json({ msg: "faltan datos requeridos" });
            }

            const nameSubCategory = name;
            const activeTheme = active;
            const idSubCategory = id;
            const subcategory = subCategory;

            const updateCategory = await CategoryRepository.editSubcategory(
                idSubCategory,
                nameSubCategory,
                activeTheme,
                subcategory
            );

            if (updateCategory) {
                return res.status(200).json({
                    status: 200,
                    message: "Categoria editada con éxito",
                    results: updateCategory,
                });
            } else {
                return res.status(404).json({ msg: "categoria no encontrada" });
            }
        } catch (error) {
            const msg: string = "Error al editar la  categoria";
            return res.status(500).json({
                msg,
            });
        }
    }

    static async deleteCategory(req: Request, res: Response) {
        try {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({ msg: "ID de tema requerido" });
            }

            const iCategory = id;

            const deleteCategory =
                await CategoryRepository.deleteCategoryIfNotChildren(iCategory);

            if (deleteCategory) {
                const jsonResponse = {
                    status: 201,
                    message: "Tema eliinado con éxito",
                    results: deleteCategory,
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

    static async deleteSubCategory(req: Request, res: Response) {
        try {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({ msg: "ID de tema requerido" });
            }

            const iCategory = id;

            const deleteCategory =
                await CategoryRepository.deleteSubCategoryIfNotChildren(
                    iCategory
                );

            if (deleteCategory) {
                const jsonResponse = {
                    status: 201,
                    message: "Tema eliinado con éxito",
                    results: deleteCategory,
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
