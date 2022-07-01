import { Inject, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { config } from "process";
import { DatabaseService } from "./database.service";

@Module({
    imports:[MongooseModule.forRootAsync({
        useFactory:(configService:ConfigService)=>({
            uri:configService.get<string>('NODE_ENV') === 'TEST' 
            ? configService.get<string>('MONGO_TEST_CONNECTION_URI') 
            : configService.get<string>('MONGO_CONNECTION_URI')
        }),
        inject:[ConfigService],
    })],
    providers:[DatabaseService],
    exports:[DatabaseService],
})
export class DatabaseModule{}

