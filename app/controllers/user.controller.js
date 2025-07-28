import { sequelize } from "../models/db.client.js";
import { User } from "../models/associations.js";
import { createUser, updateUser } from "../services/user.services.js";


export const userController = {
    async postUser(req, res){
        const { pseudo, mail, password } = req.body;

        try {
            const userCreated = await createUser(pseudo, mail, password)
            res.status(201).json(userCreated)
        } catch (error) {
            if (error.message.includes("disponible") || error.message.includes("existe")) {
                return res.status(409).json({ message: error.message });
            }
            console.log(error);
            res.status(500).send("Database down")
        }
    },

    async patchUser(req,res){
        const {id} = req.params;
        const {pseudo, mail, password, activStatus, adminStatus} = req.body;

        try {
            const userModified = await updateUser(id, pseudo, mail, password, activStatus, adminStatus)
            res.status(200).json({message: "informations mises a jour"})
        } catch (error) {
            console.log(error);
            res.status(500).send("Database down")
        }
    }
}