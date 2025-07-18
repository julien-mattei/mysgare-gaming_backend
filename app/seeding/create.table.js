import 'dotenv/config';
import { sequelize } from '../models/db.client.js';
import { Game, Cover } from '../models/associations.js';

await sequelize.drop();

await sequelize.sync();

console.log('All tables are created!');

await sequelize.close();