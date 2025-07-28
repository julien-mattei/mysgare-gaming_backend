import { sequelize } from "../models/db.client.js";
import { User } from "../models/associations.js"
import { fetchUserLogin, fetchUserProfil } from "../services/auth.services.js";

export const authController = {
    async userLogin(req, res){
        const { pseudo, password } = req.body;
        try {
            const { token, userId } = await fetchUserLogin(pseudo, password);

            res.cookie("cookie", token, {
                httpOnly: true,
                secure: false,
                maxAge: 3600000, // 1h
                sameSite: "strict"
            });

            res.status(200).json({ message: "Bienvenue", token, userId });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }

    },

    async userProfil(req,res){
        const user = req.user;
        try {
            const userLogged = await fetchUserProfil(user.id)
            res.status(200).json({message : "auth réussie", userLogged})
        } catch (error) {
            console.log(error);
            res.status(500).send("Database down")
        }
    }
}