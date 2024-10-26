import { ITheme } from "./ITheme";

export interface Isubcategory {
    name: string;
    active: boolean;
    dateCreation: Date;
    theme: ITheme[];
}
