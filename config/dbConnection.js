import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  define: {
    timestamps: false // Disable timestamps
  }
});

export default sequelize;