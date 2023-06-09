/*
 * @Author: Frank Chu
 * @Date: 2023-02-07 16:44:01
 * @LastEditors: Frank Chu
 * @LastEditTime: 2023-02-07 20:12:50
 * @FilePath: /Phonebook-backend/app.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name}, All Rights Reserved. 
 */
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const personsRouter = require('./controllers/persons')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.info('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
// app.use(middleware.requestLogger) // request.body is undefined! if it's on the top of express.json()

app.use('/api/persons', personsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

// var morgan = require('morgan')
// morgan.token('content', function (req) { return JSON.stringify(req.body) })
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

module.exports = app