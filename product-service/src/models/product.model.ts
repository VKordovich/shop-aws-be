import { v4 as UUID } from "uuid";
import { Product } from '../interfaces/product.interface';

export default class ProductModel {
    private id: string;
    private description: string;
    private price: number;
    private title: string;
    private count: number;

    constructor({ description, price, title, count }: Product) {
        this.id = UUID();
        this.description = description;
        this.price = price;
        this.title = title;
        this.count = count ?? null;
    }

    toEntityMappings(): Product {
        return {
            id: this.id,
            description: this.description,
            price: this.price,
            title: this.title,
            count: this.count
        };
    }
}
