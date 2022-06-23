import mysql from 'mysql';

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'opentutorials'
});

connection.connect();

connection.query('SELECT * FROM topic', function (error, results) {
  if (error) throw error;
  console.log(results);
});

connection.end();