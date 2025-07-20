import { DataTypes, Model} from 'sequelize';
import { sequelize } from './db.client.js'; 

export class Game extends Model {}

Game.init(
    {
        title: {
          type: DataTypes.STRING(100), 
          allowNull: false           
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nb_total_hours : {
            type: DataTypes.TIME,
            allowNull: true
        },
        finished : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        toVoted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:false
        },
        isCurrent: {
            type:DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:false
        }
    },
    {
        sequelize,
        tableName: "game"  
    }
);