import { DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';
import category from "./categoryModel.js";

const Service = sequelize.define('Service', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('Normal', 'VIP'),
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: category, // Reference to Category model
          key: 'id',
        },
        allowNull: false,
      }
    }, {
      tableName: 'services',
      timestamps: false, // If you don't want createdAt/updatedAt fields
    });
    
    // Define the relationship
    Service.belongsTo(category, { foreignKey: 'categoryId' });
    
    export default Service;