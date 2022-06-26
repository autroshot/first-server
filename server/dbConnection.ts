import mysql from 'mysql2/promise';

const connectionConfig = {
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'opentutorials',
  connectionLimit: 10,
  queueLimit: 0,
}

export const pool = mysql.createPool(connectionConfig);