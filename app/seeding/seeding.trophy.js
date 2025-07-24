import 'dotenv/config';
import { sequelize } from '../models/db.client.js';
import { list_trophies_1 } from '../datas/trophies_1.datas.js';
import { Trophy, Game, Type } from '../models/associations.js';


let types_list = [];
const types= []

for(const entity of list_trophies_1){
    for (const type of entity.trophies){
        types.push(type.type)
    }
}
types_list= new Set(types)
console.log(types_list)

for(const type of types_list){
    await Type.findOrCreate({
        where : {name:type},
        ignoreDuplicates: true
    })
}


for(const entry of list_trophies_1){
    const game = await Game.findOne({
            where : {title: entry.title}
        });
        console.log(game.id)
        for(const trophy of entry.trophies){
            const type_info = await Type.findOne({
                where : {name: trophy.type}
            })
            await Trophy.findOrCreate({
                where : {title: trophy.name},
                defaults: {
                    title: trophy.name,
                    description: trophy.description,
                    isObtained : false,
                    game_id: game.id,
                    type_id: type_info.id
                },
                ignoreDuplicates: true
            })

    }
}

console.log("seeding done");

await sequelize.close()
