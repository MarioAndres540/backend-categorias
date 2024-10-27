import Category from "../../models/CategoryModel";
import Subcategory from "../../models/SubCategoryModel";
import Theme from "../../models/themeModel";

export default class {
    static async getAll() {
        try {
            return await Category.find();
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async findOne(id: string) {
        try {
            return await Category.findById(id).select([
                "name",
                "active",
                "dateCreation",
                "subcategory",
            ]);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async create(
        name: string,
        active: boolean,
        dateCreation: Date,
        subcategory?: string
    ) {
        try {
            const newTheme = new Category({
                name,
                active,
                dateCreation,
                subcategory,
            });

            return await newTheme.save();
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async editSubcategory(
        id: string,
        name: string,
        active: boolean,
        subcategory?: string
    ) {
        try {
            return await Category.findByIdAndUpdate(
                id,
                { name, active, subcategory },
                { new: true }
            );
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async deleteSubcategory(id: string) {
        try {
            return Category.findByIdAndDelete(id);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async hasSubCategories(id: string): Promise<boolean> {
        const subCategories = await Subcategory.find({ category: id });
        return subCategories.length > 0;
    }

    static async hasThemes(id: string): Promise<boolean> {
        const themes = await Theme.find({ subCategory: id });
        return themes.length > 0;
    }

    static async deleteCategoryIfNotChildren(id: string) {
        const hasClindren = await this.hasSubCategories(id);

        if (!hasClindren) {
            return await Category.findByIdAndDelete(id);
        } else {
            throw new Error(
                "No se puede eliminar: la categoría tiene subcategorías asociadas."
            );
        }
    }

    static async deleteSubCategoryIfNotChildren(id: string) {
        const hasChildren = await this.hasThemes(id);

        if (!hasChildren) {
            return await Subcategory.findByIdAndDelete(id);
        } else {
            throw new Error(
                "No se puede eliminar: la subcategoría tiene temas asociados."
            );
        }
    }
}
