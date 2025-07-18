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
import { Vote } from "./vote.model.js";

// Relation One-To-Many between game and cover
Game.hasMany(Cover, {
    foreignKey: "game_id",
    as: "cover"
});

Cover.belongsTo(Game, {
    foreignKey: "game_id",
    as: "game"
});

// Relation One-To-Many between game and boss
Game.hasMany(Boss, {
    foreignKey: "game_id",
    as: "boss"
})

Boss.belongsTo(Game, {
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

// Relation One-To-Many between run and video 
Run.hasMany(Video, {
    foreignKey:"RunId",
    as:"video"
});

Video.belongsTo(Run, {
    foreignKey:"RunId",
    as:"run"
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

// Relation Many-To-Many between user and game
User.belongsToMany(Game, {
    through: Vote, 
    foreignKey: "user_id",
    otherKey: "game_id",
    as: "userVoted"
});

Game.belongsToMany(User, {
    through: Vote, 
    foreignKey: "game_id",
    otherKey: "user_id",
    as: "voteUser"
})

export {Game, Cover, Boss, Genre, Run, RunBoss}