import 'dotenv/config';
import { sequelize } from '../models/db.client.js';
import { Cover, Game } from '../models/associations.js';
import { games } from '../datas/gamestest.datas.js';

const image_sizes = ['thumb', 'cover_big', '720p', '1080p', 'original'];

for(const game of games){
    const game_title = await Game.findOne({
        where : {title: game.titre}
    })
    console.log(game_title.id)

    for(const size of image_sizes){
        await Cover.findOrCreate({
            where: {name: `${game.titre}_${size}`},
            defaults: {
                url: `https://images.igdb.com/igdb/image/upload/t_${size}/${game.image.image_id}.webp`,
                size: size,
                game_id: game_title.id,
            },
        ignoreDuplicates: true
        })
    }   
};

console.log("seeding done");

await sequelize.close()