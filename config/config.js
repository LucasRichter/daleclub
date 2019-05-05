const appName = 'daleclub'
const databaseName = 'daleclub'
const serverPort = process.env.PORT || 8081

const completeConfig = {

  default: {
    appName,
    serverPort,
    databaseUrl: process.env.MONGODB_URI || `mongodb://localhost/${databaseName}`,
    jsonOptions: {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  },

  development: {
    appUrl: `http://localhost:${serverPort}/`
  },

  production: {
    appUrl: `https://daleclub.com.br`
  }

}

// Public API
module.exports = {
  config: { ...completeConfig.default, ...completeConfig[process.env.NODE_ENV] },
  completeConfig
}
