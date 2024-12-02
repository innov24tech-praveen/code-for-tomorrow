import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnection.js';

const User = sequelize.define('user', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'user', 'master'),
    allowNull: false,
    defaultValue: 'user',
  },
  token: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  token_expire: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  create_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  verified: {
    type: DataTypes.TINYINT,
    defaultValue: 0,
  },
  deleted: {
    type: DataTypes.TINYINT,
    defaultValue: 1,
  },
}, {
  tableName: 'user',
  timestamps: false,
});

export default User;
