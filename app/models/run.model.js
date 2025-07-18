import { DataTypes, Model} from 'sequelize';
import { sequelize } from './db.client.js';

export class Run extends Model {}

Run.init(
    {
        name: {
          type: DataTypes.STRING(100), 
          allowNull: false           
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: "Run découverte"
        },
        nb_played_hours : {
            type: DataTypes.TIME,
            allowNull: true
        },
        finished : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        nb_death: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        startAt: {
            type: DataTypes.DATE,
            allowNull:true
        },
        endAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: "run"  
    }
);