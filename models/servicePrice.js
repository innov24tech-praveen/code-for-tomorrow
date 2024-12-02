import { DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';
import Service from "./serviceModel.js";

const ServicePrice = sequelize.define(' ServicePrice', {
    duration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('Hourly', 'Weekly', 'Monthly'),
        allowNull: false,
      },
      serviceId: {
        type: DataTypes.INTEGER,
        references: {
          model: Service, // Reference to Service model
          key: 'id',
        },
        allowNull: false,
      }
    }, {
      tableName: 'service_price_options',
      timestamps: false,
    });
    
    // Define the relationship
    ServicePrice.belongsTo(Service, { foreignKey: 'serviceId' });
    
    export default ServicePrice;