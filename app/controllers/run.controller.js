import { sequelize } from "../models/db.client.js";
import { Game, Boss, Run, Video } from "../models/associations.js"
import { fetchRuns, fetchRun, createRun, updateRun } from "../services/run.services.js";