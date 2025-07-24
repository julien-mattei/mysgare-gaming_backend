import { Game, Cover, Genre, Run, Boss, Trophy } from "../models/associations.js";
import { Sequelize } from "sequelize";
import { fetchCurrentGame, fetchGames, fetchGamesPaginated, fetchGamesToVoted, fetchGameWithBosses, fetchGameWithTrophies, fetchOneGame, fetchRandomGames } from "../services/games.services.js";

export const gamesController = {
    async getAllGames(req,res) {
        try {
            const gamesDatas = await fetchGames()
            res.status(200).json(gamesDatas)  
        } catch (error) {
            console.log(error);
            res.status(500).send("Database down")
        }
    },

    async getGamesPaginated(req, res){
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const filters = req.query.filters
        
        try {
            const gamesPaginatedDatas = await fetchGamesPaginated(page, limit, filters)
            res.status(200).json(gamesPaginatedDatas)
        } catch (error) {
            console.log(error);
            res.status(500).send("Database down")
        }
    },

    async getOneGame(req,res) {
        const {id} = req.params;
        try {
            const gameDatas = await fetchOneGame(id);
            res.status(200).json(gameDatas)
        } catch (error) {
            console.log(error);
            res.status(500).send("Database down")
        }
    },

    async getGameWitheBosses(req,res) {
        const {id} = req.params;
        try {
            const gameDatas = await fetchGameWithBosses(id);
            res.status(200).json(gameDatas)
        } catch (error) {
            console.log(error);
            res.status(500).send("Database down")
        }
    },

    async getGameWithTrohies(req,res) {
        const {id} = req.params;
        try {
            const gameDatas = await fetchGameWithTrophies(id);
            res.status(200).json(gameDatas)
        } catch (error) {
            console.log(error);
            res.status(500).send("Database down")
        }
    },

    async getRandomGames(req, res) {
        try {
            const gameDatas = await fetchRandomGames();
            res.status(200).json(gameDatas)
        } catch (error) {
            console.log(error);
            res.status(500).send("Database down")
        }
    },

    async getGamesToVoted(req, res) {
        try {
            const gameDatas = await fetchGamesToVoted();
            res.status(200).json(gameDatas)
        } catch (error) {
            console.log(error);
            res.status(500).send("Database down")
        }
    },

    async getCurrentGame(req, res){
        try {
            const gameDatas = await fetchCurrentGame();
            res.status(200).json(gameDatas)
        } catch (error) {
            console.log(error);
            res.status(500).send("Database down")
        }
    }
}