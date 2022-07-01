import { IsEnum, IsNumber, IsString, maxLength } from "class-validator";
import { isString } from "util";

export class CreateProductDto {
    @IsString({message:'need to provide product name'})
    productName:string;
    @IsString({message:'need to provide product description'})
    description:string;
    @IsNumber()
    price:number;
    @IsEnum({message:'need to provide product Catogory'})
    category:Catogory;
}

export enum Catogory{
    'ELECTRONICS'=1,
    'FOOD'=2,
    'FOOT WEAR'=3,
    'CLOTHS'=4,
    'WATCHES'=5
}