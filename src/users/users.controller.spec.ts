/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from "@nestjs/testing"
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { updateData, userStub } from "./test/stubs/users.stub";

jest.mock('./users.service')

describe('UsersController()',()=>{
    let usersController:UsersController;
    let usersService: UsersService;
    
    beforeAll(async ()=>{
       const moduleRef = await Test.createTestingModule({
           imports: [],
           controllers: [UsersController],
           providers: [UsersService],
       }).compile();
        usersService = moduleRef.get<UsersService>(UsersService);
        usersController = moduleRef.get<UsersController>(UsersController);
        jest.clearAllMocks();
    })
    describe('getuserById():/',()=>{
        let user: User;
        beforeEach(async ()=>{
            user = await usersController.getUser(userStub().userId);
        })
        test('it should called userService.',async ()=>{
            const res = await usersService.getUserById(userStub().userId);
            expect(usersService.getUserById).toBeCalledWith(userStub().userId)
        })  
        test('it should resturn user:',()=>{
            expect(user).toEqual(userStub())
        })
    })
    describe('it should list the user list',()=>{
        let user: User[];
        beforeEach(async () => {
            user = await usersController.getUsers();
        })
        test('it should called userService',async ()=>{
            const result = await usersService.getUsers();
            // expect(result).toHaveBeenCalled();
        })
        test('it should return users list',()=>{
            expect(user).toEqual([userStub()])
        })
    })
    describe('createUser()::',()=>{
        let user:User;
        let createUserDto: CreateUserDto;
        beforeEach(async () => {
            createUserDto = {
                email: userStub().email,
                age: userStub().age,
            }
            user = await usersController.createUser(createUserDto);
        })
        test('it should called userService',async ()=>{
            expect(usersService.createUser).toHaveBeenCalledWith(createUserDto.email,createUserDto.age)
        })
        test('it should return users list',()=>{
            expect(user).toEqual(userStub())
        })
    })
    describe('updateUser()::',()=>{
        let user:User;
        let updateUserDto: UpdateUserDto;
        beforeEach(async () => {
            updateUserDto = {
                age: 98,
                favoriteFoods:['pizza']
            }
            user = await usersController.updateUser(userStub().userId,updateUserDto);
        })
        test('it should called userService',async ()=>{
            expect(usersService.updateUser).toHaveBeenCalledWith(userStub().userId,updateUserDto)
        })
        test('it should return user',()=>{
            expect(user).toEqual([userStub()])
        })
    })                                                                      
})