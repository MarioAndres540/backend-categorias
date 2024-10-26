import mongoose from "mongoose";

export interface Isubcategory {
    name: string;
    active: boolean;
    dateCreation: Date;
    theme: mongoose.Types.ObjectId[];
}
