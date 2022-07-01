/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Response,Request, NextFunction } from "express";

@Injectable()
export class AuthorizationMiddlewear implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
       const ip = req.ip;
       const headers = req.headers;
    //    console.log("ip : ",ip)
    //    console.log("headers : ",headers)
       next();
    }
    
}