import { User } from "../models/associations.js";
import { Sequelize } from "sequelize";
import  argon2  from "argon2";

export async function createUser(pseudo, mail, password){
    const notAvailableUsername = await User.findOne({where: {pseudo: pseudo} })
    if(notAvailableUsername){
        return res.status(409).json({message : "ce username n'est pas disponible"})
    }

    const notAvailablemail = await User.findOne({where: {mail : mail} })
    if(notAvailablemail){
        return res.status(409).json({message : "ce mail existe deja"})
    }

    const newUser = await User.create({
        pseudo,
        mail,
        password: await argon2.hash(password)
    })
    return newUser
}

export async function updateUser(id, pseudo, mail, password, activStatus, adminStatus){ 
    const userToUpdate = await User.findByPk(id);
    await userToUpdate.update({
        pseudo,
        mail,
        password,
        isActive: activStatus,
        isAdmin: adminStatus
    })
    return {message : `User n° ${id} a bien été mis a jour`}

}