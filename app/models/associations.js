import { Game } from "./game.model.js";
import { Cover } from "./cover.model.js";
import { Boss } from "./boss.model.js";
import { Genre } from "./genre.model.js";
import { Run } from "./run.model.js";
import { RunBoss } from "./runBoss.model.js";
import { Trophy } from "./trophy.model.js";
import { Type } from "./type.model.js";
import { User } from "./user.model.js";
import { Video } from "./video.model.js";


// Relation One-To-Many between game and cover
Game.hasMany(Cover, {
    foreignKey: "game_id",
    as: "cover"
});

Cover.belongsTo(Game, {
    foreignKey: "game_id",
    as: "game"
});

// Relation One-To-Many between game and Run
Game.hasMany(Run, {
    foreignKey: "game_id",
    as: "run"
});

Run.belongsTo(Game, {
    foreignKey: "game_id",
    as:"game"
});

// Relation One-To-Many between game and trophy
Game.hasMany(Trophy, {
    foreignKey: "game_id",
    as: "trophy"
});

Trophy.belongsTo(Game, {
    foreignKey: "game_id",
    as: "game"
});

// Relation One-To-Many between trophy and type 
Type.hasMany(Trophy, {
    foreignKey:"type_id",
    as:"trophy"
});

Trophy.belongsTo(Type, {
    foreignKey:"type_id",
    as:"type"
});

// Relation Many-To-Many between game and Genre
Game.belongsToMany(Genre, {
    through: "game_has_genre",
    foreignKey: "game_id",
    otherKey: "genre_id",
    as: "genre"
});

Genre.belongsToMany(Game, {
    through: "game_has_genre",
    foreignKey: "genre_id",
    otherKey: "game_id",
    as: "game"
});

// Relation Many-To-Many between game and boss
Game.belongsToMany(Boss, {
    through:"game_has_boss",
    foreignKey: "game_id",
    otherKey:"boss_id",
    as: "bossInGame"
})

Boss.belongsToMany(Game, {
    through:"game_has_boss",
    foreignKey: "boss_id",
    otherKey:"game_id",
    as: "gameBoss"
});

// Relation Many-To-Many between run and boss 
Run.belongsToMany(Boss, {
    through: RunBoss,
    foreignKey: "run_id",
    otherKey: "boss_id",
    as:"bossRun"
});

Boss.belongsToMany(Run, {
    through: RunBoss,
    foreignKey: "boss_id",
    otherKey: "run_id",
    as:"runBoss"
});


export {Game, Cover, Boss, Genre, Run, RunBoss, User, Trophy, Type}