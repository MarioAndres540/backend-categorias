import mongoose, { Schema, Document, model } from "mongoose";
import { ICategory } from "../interfaces/ICategory";
import SubcategoryModel from "./SubCategoryModel";

interface ICategoryModel extends ICategory, Document {}

const CategorySchema: Schema = new Schema<ICategory>({
    name: { type: String, required: true },
    active: { type: Boolean, default: true },
    dateCreation: { type: Date, required: true },
    subcategory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" }],
});

const Category = model<ICategoryModel>("Category", CategorySchema);

export default Category;
