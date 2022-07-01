import { productStub } from "../test/stub/product.stub";

export const ProductService = jest.fn().mockReturnValue({
    create:jest.fn().mockResolvedValue(productStub()),
    findAll:jest.fn().mockResolvedValue([productStub()]),
    findOne:jest.fn().mockResolvedValue(productStub()),
    update:jest.fn().mockResolvedValue([productStub()])
})