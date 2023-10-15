import { v4 as UUID } from "uuid";
import { Product } from '../interfaces/product.interface';

export default class ProductModel {
    private id: string;
    private description: string;
    private price: number;
    private title: string;

    constructor({
                    id = UUID(),
                    description,
                    price,
                    title
    }: Product) {
        this.id = id;
        this.description = description;
        this.price = price;
        this.title = title;
    }

    toEntityMappings(): Product {
        return {
            id: this.id,
            description: this.description,
            price: this.price,
            title: this.title
        };
    }
}
