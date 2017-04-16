module.exports = {
  "dbConfig": {
    "client": "mysql",
    "connection": {
      "host": process.ENV.DB_HOST,
      "user": process.ENV.DB_USER,
      "password": process.ENV.DB_PASSWORD,
      "database": process.ENV.DB_DATABASE,
      "charset": "utf8"
    },
  },
  "pool": {
    "min": 1,
    "max": 10
  }
}

