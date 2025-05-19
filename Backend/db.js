const mysql = require('mysql2');
require('dotenv').config(); 

// Create a connection to the MySQL database using environment variables
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  
  // Export the connection to be used in other files
  module.exports = pool;