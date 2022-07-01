import { Product } from "../../entities/product.entity";

export const productStub = ():Product =>{
    return {
        productId:'123',
        productName:'aaaaa',
        description:'this is for testing this module',
        price:123,
        category:"ELECTRONICS",
    }
}