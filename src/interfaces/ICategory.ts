import mongoose from "mongoose";

export interface ICategory extends Document {
    name: string;
    active: boolean;
    dateCreation: Date;
    subcategory: mongoose.Types.ObjectId[];
}
