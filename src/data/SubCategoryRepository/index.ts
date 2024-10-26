import Subcategory from "../../models/SubCategoryModel";

export default class SubCategoryRespository {
    static async getAll() {
        try {
            return await Subcategory.find();
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async findOne(id: string) {
        try {
            return await Subcategory.findById(id).select([
                "name",
                "active",
                "dateCreation",
                "theme",
            ]);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async create(
        name: string,
        active: boolean,
        dateCreation: Date,
        theme: string
    ) {
        try {
            const newTheme = new Subcategory({
                name,
                active,
                dateCreation,
                theme,
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
        theme: string
    ) {
        try {
            return await Subcategory.findByIdAndUpdate(
                id,
                { name, active, theme },
                { new: true }
            );
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async deleteSubcategory(id: string) {
        try {
            return Subcategory.findByIdAndDelete(id);
        } catch (error: any) {
            throw new Error(error);
        }
    }
}
