import { Test, TestingModule } from '@nestjs/testing';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { productStub } from './test/stub/product.stub';


jest.mock('./product.service')

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports:[],
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    productController = moduleRef.get<ProductController>(ProductController);
    productService = moduleRef.get<ProductService>(ProductService);
    jest.clearAllMocks();
  });

  describe('should be defined', () => {
    let product: Product;
    beforeEach(async () => {
      product = await productController.findOne(productStub().productId);
    })
    test('it should called userService.', async () => {
      expect(productService.findOne).toBeCalledWith(productStub().productId)
    })
    test('it should resturn user:', () => {
      expect(product).toEqual(productStub())
    })
  })
});
