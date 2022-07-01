import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EntityRepository } from "../database/entity.repository";
import { ProductDocument, Product } from "./entities/product.entity";

@Injectable()
export class ProductRepository extends EntityRepository<ProductDocument>{
    constructor(@InjectModel(Product.name) product: Model<ProductDocument>) {
        super(product)
    }
}