import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { ProductRepository } from './product.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Product.name,schema:ProductSchema}]),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService,ProductRepository]
})
export class ProductModule {}
