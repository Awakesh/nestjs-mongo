/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';
import { v4 as uuidv4 } from 'uuid';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
@Injectable()
export class ProductService {
  constructor(private readonly productRepository : ProductRepository,private readonly httpService: HttpService){}
  
  callProductApi():Observable<AxiosResponse<any>>{
    let createProductDto:any;
    return this.httpService.get('https://dummyjson.com/products')
    }
  create(createProductDto: CreateProductDto) {
    return this.productRepository.create({
      productId:uuidv4(),
      productName:createProductDto.productName,
      description:createProductDto.description,
      price:createProductDto.price,
      category:createProductDto.category,
    });
  }

  findAll() : Promise<Product[]> {
    return this.productRepository.find({});
  } 

  findOne(productId: string):Promise<Product> {
    return this.productRepository.findOne({productId});
  }

  update(productId: string, updateProductDto: UpdateProductDto): Promise<Product>{
    return this.productRepository.findOneAndUpdate({productId},updateProductDto);
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}

