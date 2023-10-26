const mysql = require('mysql2/promise');

const mysqlUrl = "mysql://root:2Ff3GcH362-g-dFCFb-D3d4CHeDFhbGC@viaduct.proxy.rlwy.net:20864/railway"

async function dbConnection() {
  try {
    const connection = await mysql.createConnection(mysqlUrl);
    console.log("Conectado ao banco de dados");
    return connection;
  }catch (error) {
    console.log("Erro ao conectar ao banco de dados");
    throw (error);
  }
}

// async function queryDatabase() {
//   const connection = await dbConnection();
//   try {
//     const [rows, fields] = await connection.execute("SELECT * FROM railway.users");
//   }
// }

// const dbConnection = mysql.createConnection({
//   host: "viaduct.proxy.rlwy.net:20864",
//   user: 'root',
//   password: '2Ff3GcH362-g-dFCFb-D3d4CHeDFhbGC',
//   database: 'railway'
// });

export { dbConnection };