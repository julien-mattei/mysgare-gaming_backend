import { DataTypes, Model} from 'sequelize';
import { sequelize } from './db.client.js';

export class Trophy extends Model {}

Trophy.init(
  {
    title: {
      type: DataTypes.STRING(250), 
      allowNull: false           
    },
    description : {
      type: DataTypes.TEXT, 
      allowNull: false           
    },
    isObtained: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    obtention_date : {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize,  
    tableName: "trophy"
  }
);