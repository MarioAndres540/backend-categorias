import { ITheme } from "../interfaces/ITheme";
import mongoose, { Document, Schema, model } from "mongoose";

interface IThemeModel extends ITheme, Document {}

const ThemeSchema: Schema = new Schema({
    name: { type: String, required: true },
    active: { type: Boolean, default: true },
    dateCreation: { type: Date, required: true },
});

const Theme = model<IThemeModel>("Theme", ThemeSchema);

export default Theme;
