import { DataTypes, Model} from 'sequelize';
import { sequelize } from './db.client.js';

export class Video extends Model {}

Video.init(
    {
        title: {
          type: DataTypes.STRING(100), 
          allowNull: false           
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: "video"  
    }
);