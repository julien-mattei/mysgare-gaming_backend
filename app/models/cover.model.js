import { DataTypes, Model} from 'sequelize';
import { sequelize } from './db.client.js';

export class Cover extends Model {}

Cover.init(
    {
        name: {
          type: DataTypes.STRING(100), 
          allowNull: false           
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        size: {
            type: DataTypes.STRING(25),
            allowNull:false
        }
    },
    {
        sequelize,
        tableName: "cover"  
    }
);