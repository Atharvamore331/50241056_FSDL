const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
require('dotenv').config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const initDb = async () => {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    await connection.end();
  } catch (error) {
    console.error('Error creating database:', error.message);
    // Continue anyway, maybe the DB exists or we don't have permissions to create
  }
};

const sequelize = new Sequelize(DB_NAME, DB_USER || 'root', DB_PASSWORD || '', {
  host: DB_HOST || 'localhost',
  dialect: 'mysql',
  logging: false,
});

const connectDB = async () => {
  try {
    await initDb();
    await sequelize.authenticate();
    console.log('MySQL Database connected successfully.');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    console.log('Attempting to continue without immediate failure...');
  }
};

module.exports = { sequelize, connectDB };
