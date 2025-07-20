import { Router } from "express";
import { gamesController } from "./controllers/games.controller.js";

export const router = new Router();

router.get("/api/games", gamesController.getAllGames)
router.get("/api/games/paginated", gamesController.getGamesPaginated)

router.get("/api/games/random", gamesController.getRandomGames)
router.get("/api/games/:id", gamesController.getOneGame)
