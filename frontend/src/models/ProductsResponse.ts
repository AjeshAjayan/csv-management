import { Product } from "./Products";

export type ProductsResponse = {
    products: Product[],
    total: number,
}