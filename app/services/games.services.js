import { Game, Cover, Genre, Run, Boss } from "../models/associations.js"
import { sequelize } from "../models/db.client.js";
import { Op, Sequelize } from "sequelize";


export async function fetchGames(){
    const allGames = await Game.findAll({
        attributes: ["id", "title", "year", "finished"],
        include: [
            {
                model: Cover,
                as: "cover",
                attributes: ["id","name", "url"]
            }
        ]     
    });
    const nbGames = await Game.count()
    return{allGames, nbGames}
}

export async function fetchGamesPaginated(page, limit) {
    const numeroPage = Number(page);
    const limitMax = Number(limit)
    const offset = (numeroPage - 1) * limitMax

    const games = await Game.findAll({
        attributes: ["id", "title", "year"],
        include: [
            {
                model: Cover,
                as: "cover",
                attributes: ["id","name", "url"]
            },
            {
                model: Genre,
                through:{attributes: []},
                as: "genre",
                attributes: ["id", "name"]
            }
        ],
        offset,
        limit: limitMax,        
    })
    const nbGames = await Game.count()

    const nbPages = Math.ceil(nbGames/limitMax);
    let gamesDetails = [];
    for(const game of games){
        const gameDetails = {
            id: game.id,
            title : game.title,
            year : game.year,
            cover_id: game.cover[1].id,
            cover_name : game.cover[1].name,
            cover_url: game.cover[1].url,
            genre: game.genre
        }
        gamesDetails.push(gameDetails)
    }
    return {gamesDetails, nbGames, nbPages, pageSize : limitMax, currentPage: numeroPage}
}

export async function fetchOneGame(id) {
    const game = await Game.findByPk(id, {
        attributes: ["id", "title", "year", "nb_total_hours", "finished"],
        include: [
            {
                model: Cover,
                as: "cover",
                attributes: ["id","name", "url"]
            },
            {
                model: Genre,
                through:{attributes: []},
                as: "genre",
                attributes: ["id", "name"]
            }
        ],
    });

    const nbRuns = await game.countRun()
    const nbBoss = await game.countBossInGame()
    const nbTrophies = await game.countTrophy()

    const gameDetails = {
        id : game.id,
        title: game.title,
        year: game.year,
        hours_played: game.nb_total_hours,
        finished: game.finished,
        cover_id: game.cover[4].id,
        cover_name: game.cover[4].name,
        cover_url: game.cover[4].url,
        genre: game.genre
    }

    return ({gameDetails, nbRuns, nbBoss, nbTrophies})
}

export async function fetchRandomGames() {
    const games = await Game.findAll({
        where: {
            [Op.and]:
            [{finished : false},
            {isCurrent: false}]
        },
        attributes: ["id"],
        order: [Sequelize.literal('random()'),],
        limit: 3
    });
    
    await Game.update(
        {toVoted : false},
        {where: {}}
    )

    const ids = games.map(game => game.id)
    await Game.update(
        {toVoted: true},
        {where: {id : {[Op.in]: ids}}}
    )

    const gamesId = await Game.findAll({
        where: {id : {[Op.in]: ids}},
        attributes: ["id", "toVoted"]
    })
    console.log(gamesId)
    return gamesId;
}

export async function fetchGamesToVoted(){
    const games = await Game.findAll({
        where: {toVoted: true},
        attributes: ["id", "title", "year"],
        include: [
            {
                model: Cover,
                as: "cover",
                attributes: ["id","name", "url"]
            }
        ]
    })

    const gamesToVoted = [];
    for(const game of games){
        const gameData = {
            id: game.id,
            title : game.title,
            year : game.year,
            cover_id: game.cover[2].id,
            cover_name : game.cover[2].name,
            cover_url: game.cover[2].url,
        }
        gamesToVoted.push(gameData)
    }
    return gamesToVoted;
}

export async function fetchCurrentGame(){
    const game = await Game.findOne({
        where : {isCurrent: true},
        attributes: ["id", "title", "year"],
        include: [
            {
                model: Cover,
                as: "cover",
                attributes: ["id","name", "url"]
            }
        ]
    })

    const currentGame = {
        id : game.id,
        title: game.title,
        cover_id: game.cover[2].id,
        cover_name: game.cover[2].name,
        cover_url: game.cover[2].url,
    }

    return currentGame
}

export async function createGame() {

}

export async function updateGame() {

}

export async function deleteGame(id) {
    const game = await Game.destroy(
        {
            where : {id}
        }
    ) 
        
    return game
}