import { DataTypes, Model} from 'sequelize';
import { sequelize } from './db.client.js'; // Assure-toi d'avoir une instance de sequelize client

export class Type extends Model {}

Type.init(
    {
        name: {
          type: DataTypes.STRING(25), 
          allowNull: false         
        }
    },
    {
        sequelize,
        tableName: "type" 
    }
);