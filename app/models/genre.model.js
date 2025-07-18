import { DataTypes, Model} from 'sequelize';
import { sequelize } from './db.client.js';

export class Genre extends Model {}

Genre.init(
    {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    },
    {
      sequelize, 
      tableName: "genre"
    }
);