import 'dotenv/config';
import { sequelize } from '../models/db.client.js';
import { Genre, Game } from '../models/associations.js';
import { games } from '../datas/gamestest.datas.js';


let genresList = [];
const genres = [];

// Get all genre with no duplicate then seed table genre with findorcreate method
for(const game of games){
    for(const genre of game.genres){
        genres.push(genre)
    }
};
genresList = new Set(genres)

for(const genre of genresList){
    await Genre.findOrCreate(
        {
            where: { name: genre },
            ignoreDuplicates: true
        })
};

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
};

console.log("seeding done");

await sequelize.close()