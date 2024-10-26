import { Isubcategory } from "./ISubcategory";

export interface ICategory extends Document {
    nome: string;
    active: boolean;
    dateCreation: Date;
    subcategory: Isubcategory[];
}
