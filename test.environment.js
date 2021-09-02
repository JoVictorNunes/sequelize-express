const NodeEnv = require('jest-environment-node')
const { execSync } = require('child_process')
const { createConnection } = require('mysql2')

const sequelizeCLI = 'npx sequelize-cli'

class TestEnvironment extends NodeEnv {
  constructor(config, context) {
    super(config, context)
    process.env.NODE_ENV = 'test'
  }

  setup() {
    execSync(`${sequelizeCLI} db:migrate --env test`)
  }

  async teardown() {
    const connection = createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'jbm_test'
    })

    connection.query(
      'DROP TABLE IF EXISTS car, customer, phone, sequelizemeta, service, serviceorder',
      function (err) {
        if (err) {
          console.log('something went wrong')
        }
      }
    )

    connection.end(function (err) {
      if (err) {
        console.log('something went wrong')
      }
    })
  }
}

module.exports = TestEnvironment