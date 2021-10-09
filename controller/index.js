require('dotenv').config()

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_TEST,
  server: process.env.DB_HOST2,
  port: parseInt(process.env.DB_PORT, 10),
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

module.exports = sqlConfig;