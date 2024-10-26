import Category from "../../models/CategoryModel";

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
        subcategory: string
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
        subcategory: string
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
}
