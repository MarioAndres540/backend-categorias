import mongoose, { Schema, Document } from "mongoose";
import { Isubcategory } from "../interfaces/ISubcategory";
import theme from "./themeModel";

const SubcategorySchema = new Schema<Isubcategory>({
    name: { type: String, required: true },
    active: { type: Boolean, required: true },
    theme: [{ type: theme.schema }],
});

export default mongoose.model<Isubcategory & Document>(
    "Subcategory",
    SubcategorySchema
);
