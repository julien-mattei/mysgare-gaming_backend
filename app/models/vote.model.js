import { DataTypes, Model} from 'sequelize';
import { sequelize } from './db.client.js'; // Assure-toi d'avoir une instance de sequelize client

export class Vote extends Model {}

Vote.init(
    {
        isVoted: {
          type: DataTypes.BOOLEAN, 
          allowNull: false,
          defaultValue: false         
        }
    },
    {
        sequelize,
        tableName: "vote" 
    }
);