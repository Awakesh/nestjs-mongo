/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { productStub } from './test/stub/product.stub';

jest.mock('./product.repository')
describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: ProductRepository;
  let userFilterQuery: FilterQuery<Product>;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService,ProductRepository],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productRepository = module.get<ProductRepository>(ProductRepository);
    jest.clearAllMocks();
    userFilterQuery = {
      userId: productStub().productId
    }
  });

  describe('It should return user',() => {
    let product:Product;
    beforeEach(async ()=>{
      product = await productService.findOne(productStub().productId);
    })
    test('It should call repository method',()=>{
      expect(productRepository.findOne).toHaveBeenCalledWith({"productId": "123"});
    })
    test('it should check both object',()=>{
      expect(product).toEqual(productStub())
    })
  });
});
