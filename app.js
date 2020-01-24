if (process.env.NODE_ENV === "development") {
  require('dotenv').config()
}

require('./config/mongoose')
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const app = express()
const routes = require("./routes")
var bodyParser = require('body-parser')
const { errorHandler } = require("./middlewares/errorHandler")


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan("dev"))
app.use('/', routes)
app.use(errorHandler)

module.exports = app