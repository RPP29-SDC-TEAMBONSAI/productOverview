const sql = require('mssql');
//const sqlConfig = require('./controller/index.js');

const sqlConfig = {
  user: "sa",
  password: "Learn1234!",
  database: "Test",
  server: "localhost",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

const skuTable = async () => {
  let pool;
  try {
   // make sure that any items are correctly URL encoded in the connection string
   console.log(`MSSQL connection opening with ${sqlConfig.server}...`)
   pool = await sql.connect(sqlConfig)
   const { tableset } = await sql.query` IF NOT EXISTS (SELECT [name] FROM sys.tables WHERE [name] = 'sku')
   CREATE TABLE skus (
    id bigint IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL
    , styleId bigint NOT NULL
    , size nvarchar(55) NOT NULL
    , quantity nvarchar(55) NULL
   ) `;
   console.log('skus table is has been created, please load data...')
  } catch (err) {
   console.log('Query error ' + err) // ... error checks
  } finally {
    await pool.close();
    console.log('Connection closed.')
  }
 }

 module.exports = skuTable;