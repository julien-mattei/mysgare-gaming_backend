import { Router } from "express";
import { gamesController } from "./controllers/games.controller.js";
import { authToken } from "./middlewares/auth.middleware.js";
import { authController } from "./controllers/auth.controller.js";
import { userController } from "./controllers/user.controller.js";


export const router = new Router();

//routes games
router.get("/api/games", gamesController.getAllGames)
router.get("/api/games/paginated", gamesController.getGamesPaginated)
router.get("/api/games/random", gamesController.getRandomGames)
router.get("/api/games/toVoted", gamesController.getGamesToVoted)
router.get("/api/games/isCurrent", gamesController.getCurrentGame)
router.get("/api/games/:id", gamesController.getOneGame)
router.get("/api/games/:id/boss", gamesController.getGameWitheBosses)
router.get("/api/games/:id/trophies", gamesController.getGameWithTrohies)

router.patch("/api/games/:id", authToken, gamesController.updateGame)


//routes users
router.post("/api/users", userController.postUser)
router.patch("/api/users/:id", authToken ,userController.patchUser)

//routes login
router.post("/api/login", authController.userLogin)
router.get("/api/profil", authToken, authController.userProfil)

