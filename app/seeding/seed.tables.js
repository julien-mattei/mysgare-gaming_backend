import 'dotenv/config';
import { sequelize } from '../models/db.client.js';
import {Game, Genre, Cover } from '../models/associations.js';
import { games } from '../datas/game.datas.js';

export let genresList = [];
const genres = [];

const image_sizes = ['thumb', 'cover_big', '720p', '1080p', 'original']

// Get all genre with no duplicate then seed table genre
for(const game of games){
    for(const genre of game.genres){
        genres.push(genre)
    }
}
genresList = new Set(genres)

for(const genre of genresList){
    await Genre.create({
        name : genre
    })
}

// Seed table game
for(const game of games){
    await Game.create({
        title: game.titre,
        year: game.annee
    })
}

for(const game of games){
    const game_title = await Game.findOne({
        where : {title: game.titre}
    })
    for(const size of image_sizes){
        await Cover.create({
        name: `${game.titre}_${size}`,
        url: `https://images.igdb.com/igdb/image/upload/t_${size}/${game.image.image_id}`,
        size: size,
        game_id: game_title.id
        })
    }   
}

// Get game and genre by title and name in order to seed table game_has_genre
for(const gameData of games){
    const { titre, genres} = gameData
    const gameInstance = await Game.findOne({
        where : {title: titre}
    })

    const genreInstance = await Genre.findAll({
        where : {name: genres}
    })

    await gameInstance.addGenre(genreInstance)
}

console.log("seeding done");

await sequelize.close()