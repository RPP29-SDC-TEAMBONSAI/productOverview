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

module.exports = sqlConfig;