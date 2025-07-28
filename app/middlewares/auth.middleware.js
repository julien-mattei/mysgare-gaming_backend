import jwt from "jsonwebtoken";
import fs from "fs";

// Récuperation de la clé publique generé au lancement du serveur et msie eu format utf8
const publicKey = fs.readFileSync("public.key", "utf-8");

// fonction de verification de l'authentification via le token pour un user lors de la connexion
export function authToken(req, res, next) {
    const token = req.cookies.cookie;

    if(!token){
        return res.status(401).json("token non existant!")
    }

    jwt.verify(token, publicKey, (err, decoded) => {
        if(err) {
            return res.status(401).json("token non valide!")
        }

        req.user = decoded;
        next()
    })
}