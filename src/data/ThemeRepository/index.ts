import Theme from "../../models/themeModel";
import { config } from "dotenv";
import axios from "axios";

export default class ThemesRepository {
    static async getAll() {
        try {
            return await Theme.find();
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async findOne(id: string) {
        try {
            return await Theme.findById(id).select([
                "name",
                "active",
                "dateCreation",
            ]);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async create(name: string, active: boolean, dateCreation: Date) {
        try {
            const newTheme = new Theme({ name, active, dateCreation });

            return await newTheme.save();
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async editTheme(id: string, name: string, active: boolean) {
        try {
            return await Theme.findByIdAndUpdate(
                id,
                { name, active },
                { new: true }
            );
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async deleteTheme(id: string) {
        try {
            return Theme.findByIdAndDelete(id);
        } catch (error: any) {
            throw new Error(error);
        }
    }
}
