import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnection.js';

const Category = sequelize.define(
  'Category', // Singular name
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'categories', // Explicit table name
    timestamps: false, // Disable timestamps
  }
);

export default Category;
