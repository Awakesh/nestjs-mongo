import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';
import { Catogory, CreateProductDto } from './create-product.dto';

const PATCH = 'patch';
const POST = 'post';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsString({message:'need to provide product name'})
    @IsOptional({ groups: [PATCH] })
    @IsNotEmpty({ always: true })
    productName:string;
    @IsString({message:'need to provide product description'})
    @IsOptional({ groups: [PATCH] })
    @IsNotEmpty({ always: true })
    description:string;
    @IsNumber()
    @IsOptional({ groups: [PATCH] })
    @IsNotEmpty({ always: true })
    price:number;
    @IsEnum({message:'need to provide product Catogory'})
    @IsOptional({ groups: [PATCH] })
    @IsNotEmpty({ always: true })
    category:Catogory;
}
