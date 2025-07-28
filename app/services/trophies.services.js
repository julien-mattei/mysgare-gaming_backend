import { Trophy } from "../models/associations.js";

export async function createTrophy(title, description, game_id, type_id) {
    const newTrophy = await Trophy.create({
        title: title,
        description: description, 
        game_id : game_id,
        type_id : type_id
    });
    return newTrophy
};

export async function updateTrophy(id, status){
    const trophyToUpdate = await Trophy.findByPk(id);

    await trophyToUpdate.update({
        isObtained : status,
        obtention_date: status ? Date() : null
    })

    return trophyToUpdate
}