const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const News = sequelize.define('News', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
  trending: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

module.exports = News;
