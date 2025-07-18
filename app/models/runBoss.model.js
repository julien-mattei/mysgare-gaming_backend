import { DataTypes, Model} from 'sequelize';
import { sequelize } from './db.client.js'; 

export class RunBoss extends Model {}

RunBoss.init(
    {
        duration: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        nb_death : {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        killed : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        sequelize,
        tableName: "run_has_boss"  
    }
);