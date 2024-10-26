import mongoose, { Schema, Document, model } from "mongoose";
import { Isubcategory } from "../interfaces/ISubcategory";
import theme from "./themeModel";

interface ISubcategoryModel extends Isubcategory, Document {}

const SubcategorySchema: Schema = new Schema({
    name: { type: String, required: true },
    active: { type: Boolean, required: true },
    dateCreation: { type: Date, required: true },
    theme: [{ type: mongoose.Schema.Types.ObjectId, ref: "Theme" }],
});

const Subcategory = model<ISubcategoryModel>("Subcategory", SubcategorySchema);

export default Subcategory;
