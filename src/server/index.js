const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const customerRouter = require('./contexts/customer/routes')
const carRouter = require('./contexts/car/routes')

const { sequelize } = require('../models')

sequelize.authenticate()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/customer', customerRouter)
app.use('/car', carRouter)

app.listen(port, () => {
  console.log(`Servidor executando na porta ${port}`)
})
