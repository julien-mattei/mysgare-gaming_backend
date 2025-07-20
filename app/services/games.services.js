import { Game, Cover, Genre } from "../models/associations.js"
import { sequelize } from "../models/db.client.js";
import { Sequelize } from "sequelize";


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
    const limitMax = Math.min(Number(limit),30)
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

    return (gameDetails)
}

export async function fetchRandomGames() {
    const games = await Game.findAll({
        attributes: ["id", "title"],
        include: [
            {
                model: Cover,
                as: "cover",
                attributes: ["id", "name", "url"], 
                separate:true
            }
        ],
        order: [Sequelize.literal('random()'),],
        limit: 3
    });
    
    const randomGames = [];
    for(const game of games){
        const random = {
            id: game.id,
            title: game.title,
            cover_id: game.cover[1].id,
            cover_name : game.cover[1].name,
            cover_url: game.cover[1].url
        }
        randomGames.push(random)
    }

    return randomGames;
}