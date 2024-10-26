import { ITheme } from "../interfaces/ITheme";
import mongoose, { Schema, Document, model } from "mongoose";

const ThemeSchema = new Schema<ITheme>({
    name: { type: String, required: true },
    active: { type: Boolean, default: true },
});

const Theme = model<ITheme & Document>("Theme", ThemeSchema);

export d