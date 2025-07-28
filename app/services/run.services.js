import { sequelize } from "../models/db.client.js";
import { Game, Boss, Run, Video, Cover } from "../models/associations.js"


export async function fetchRuns(){
    const runs = await Run.findAll({
        attributes : ["id", "name"],
        include : [
            {
                model: Game,
                as: "game",
                attributes: ["id", "title"],
                include : [
                    {
                        model: Cover,
                        as: "cover",
                        attributes: ["id","name", "url"]
                    }
                ]
            }
        ],
    })
    return runs
}

export async function fetchRun(id){
    const run = await Run.findByPk(id, {
        attributes : ["id", "name", "description", "nb_played_hours", "finished", "nb_death", "startAt", "endAt"],
        include : [
            {
                model: Boss,
                through:{attributes:[]},
                as: "bossRun",
                attributes : ["id", "name"]
            },
            {
                model: Game,
                as: "game",
                attributes: ["id", "title"],
                include : [
                    {
                        model: Cover,
                        as: "cover",
                        attributes: ["id","name", "url"]
                    }
                ]
            }
        ],
    })
    return run
}

export async function createRun(nameRun, descRun){
    const newRun = await Run.create({
        name: nameRun,
        description : descRun
    });
    return {newRun, message : `Run crée avec succès`};
}

export async function updateRun(id, desc, hours, status, death, begin, end){
    const trophyToUpdate = await Trophy.findByPk(id)
    await trophyToUpdate.update({
        description : desc,
        nb_played_hours : hours,
        finished :status,
        nb_death: death,
        startAt : begin,
        endAt: end 
    })
    return {message : `Run n° ${id} a bien été mise à jour`}
}

export async function deleteRun(id){
    await Run.destroy({where : {id}})
    return {message : `Run n° ${id} a bien été supprimée`}
}