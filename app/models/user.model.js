import { DataTypes, Model} from 'sequelize';
import { sequelize } from './db.client.js';

export class User extends Model {}

User.init(
    {
        pseudo: {
          type: DataTypes.STRING(100), 
          allowNull: false           
        },
        mail: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: "user"  
    }
);