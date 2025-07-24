import 'dotenv/config';
import { sequelize } from '../models/db.client.js';
import { boss_1_14 } from '../datas/bossGames.datas.js';
import { Boss, Game } from '../models/associations.js';

for(const entry of boss_1_14){
    const game = await Game.findOne({
        where : {title: entry.title}
    })

    for(const boss of entry.bosses){
        const boss_info = await Boss.findOrCreate({
            where : {name : boss.boss_name},
            defaults: {
                name : boss.boss_name,
                isMain: boss.main_boss
            },
            ignoreDuplicates: true
        })

        await game.addBossInGame(boss_info.id)
    }
}

console.log("seeding done");

await sequelize.close()

 