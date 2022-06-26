import { sequelize } from '../dbConnection';
import { DataTypes } from 'sequelize';

export const Author = sequelize.define('Author', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  profile: {
    type: DataTypes.STRING(200),
  }
});