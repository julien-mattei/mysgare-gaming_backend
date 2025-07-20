import 'dotenv/config';
import { sequelize } from '../models/db.client.js';
import { Game } from '../models/associations.js';
import { games } from '../datas/game.datas.js';

// Seed table game
for(const game of games){
    await Game.findOrCreate({
        where:{ title: game.titre },
        defaults: {
            year: game.annee
        },
        ignoreDuplicates: true
    })
};

console.log("seeding done");

await sequelize.close()