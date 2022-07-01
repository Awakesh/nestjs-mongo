/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test } from "@nestjs/testing"
import { AppModule } from "../app.module";
import { Connection } from "mongoose";
import { DatabaseService } from "../database/database.service";
import { userStub } from "./test/stubs/users.stub";
import * as request from 'supertest';
import { CreateUserDto } from "./dto/create-user.dto";

describe('users end to end testing',()=>{
    let dbConnection:Connection;
    let httpServer:any;
    let app:any;
    beforeAll(async ()=>{
        const moduleRef = await Test.createTestingModule({
            imports:[AppModule],
        }).compile();
        app = moduleRef.createNestApplication();
        app.init();
        dbConnection = moduleRef.get<DatabaseService>(DatabaseService).getDbHandle()
        httpServer= app.getHttpServer();
    })
    
    afterAll(async ()=>{
        await app.close();
    })
    
    beforeEach(async ()=>{
        await dbConnection.collection('users').deleteMany({});
    })

    describe('user module testing',()=>{
        it('it should return array of user',async ()=>{
            await dbConnection.collection('users').insertOne(userStub())
            const responce = await request(httpServer).get('/users/')
            expect(responce.status).toBe(200)
            expect(responce.body).toMatchObject([userStub()])
        })
    })
    describe('it should create user',()=>{
        it('it should able to create user',async ()=>{
            const createUserDto:CreateUserDto = {
                email: userStub().email,
                age: userStub().age
            }
            const result = await request(httpServer).post('/users').send(createUserDto);
            expect(result.status).toBe(201);
            expect(result.body).toMatchObject(createUserDto);
            const user = await dbConnection.collection('users').findOne({email: createUserDto.email,age:createUserDto.age})
            expect(user).toMatchObject(createUserDto);
        })
    })
    describe('getUserById',()=>{
        it('it should able to get user by userId', async ()=>{
            await dbConnection.collection('users').insertOne(userStub())
            const result = await request(httpServer).get('/users').query(userStub().userId);
            expect(result.status).toBe(200);
            expect(result.body).toMatchObject([userStub()])
        })
    })
})