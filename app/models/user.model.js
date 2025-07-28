import { DataTypes, Model} from 'sequelize';
import { sequelize } from './db.client.js';

export class User extends Model {}

User.init(
    {
        pseudo: {
          type: DataTypes.STRING(100), 
          allowNull: false,
          unique: true          
        },
        mail: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: true,
            unique: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue: false
        }
    },
    {
        sequelize,
        tableName: "user"  
    }
);