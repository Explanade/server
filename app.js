if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
  require('dotenv').config()
}

require('./config/mongoose')
const path = require('path')
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const app = express()
const routes = require("./routes")
const { errorHandler } = require("./middlewares/errorHandler")

app.use(express.static(path.resolve(__dirname, 'public'), { dotfiles: 'allow' } ))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan("dev"))
app.use('/', routes)
app.use(errorHandler)

module.exports = app