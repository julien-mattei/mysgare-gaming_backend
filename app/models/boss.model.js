import { DataTypes, Model} from 'sequelize';
import { sequelize } from './db.client.js';

export class Boss extends Model {}

Boss.init(
    {
        name: {
          type: DataTypes.STRING(100), 
          allowNull: false           
        },
        isMain: {
            type:DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: "boss"  
    }
);