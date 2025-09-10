import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { JWT_PUBLIC_KEY } from "./config"

export  function authMiddleware(req:Request,res:Response,next:NextFunction){
    const token = req.headers['authorization']
    console.log("this is token ",token)
    if(!token){
        res.status(401).json({
            error: "Unauthorized"
        })
        return
    }
    const decoded = jwt.verify(token,JWT_PUBLIC_KEY)
    console.log(decoded)
    if(!decoded|| !decoded.sub){
        res.status(403).json({
            error:"maybe token is invalid"
        })
        return 
    }

    req.userId= decoded.sub as string
    next()
}