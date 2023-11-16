const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
  host: 3306,
  user: 'root',
  password: '99751932pai',
  database: 'messages'
});

export { dbConnection };
