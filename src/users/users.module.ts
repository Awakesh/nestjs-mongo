/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { MiddlewareConsumer, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./old-users.repository";
import { UsersService } from "./users.service";
import { AuthorizationMiddlewear } from "src/middleware/auth.middleware";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository]
})
export class UsersModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthorizationMiddlewear)
            .forRoutes({path:'/users/*',method:RequestMethod.GET});
    }
    
}