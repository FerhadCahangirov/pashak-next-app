import { ICategory } from "./ICategory";

export interface IProduct {
    id: number;
    name: string;
    category: ICategory;
    content: string;
    description: string;
    images: IProductImage[];
    compositions: IComposition[];
}

export interface IProductDetails extends IProduct {
    relatedProducts: IProduct[];
}

export interface IProductImage {
    id: number;
    src: string,
}

export interface IComposition {
    id: number;
    name: string;
}