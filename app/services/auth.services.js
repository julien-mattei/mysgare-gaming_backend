import { User } from "../models/associations.js";
import { sequelize } from "../models/db.client.js";
import  argon2  from "argon2";
import jwt from "jsonwebtoken";
import fs from "fs"

export async function fetchUserLogin(pseudo, password){
    const login = await User.findOne({where : {pseudo: pseudo}})
    if(!login){
        return res.status(401).json({message: 'username inconnu'})
    }
    const isPasswordValid = await argon2.verify(login.password, password)
    if(!isPasswordValid){
        return res.status(401).json({message: 'password incorrect'})
    }

    // Création d'un token jwt
    const privateKey = fs.readFileSync("private.key", "utf8")
    const token = jwt.sign(
        {id : login.id}, privateKey, {algorithm: "RS256", expiresIn : "1h"}
    )
    return {token, userId: login.id}
}

export async function fetchUserProfil(id){
    const user = await User.findByPk(id,{
        attributes: ["id", "pseudo", "mail"]
    })
    return user
}