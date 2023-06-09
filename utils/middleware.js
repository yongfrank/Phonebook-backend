/*
 * @Author: Frank Chu
 * @Date: 2023-02-07 16:45:34
 * @LastEditors: Frank Chu
 * @LastEditTime: 2023-02-07 19:03:54
 * @FilePath: /Phonebook-backend/utils/middleware.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name}, All Rights Reserved. 
 */

const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
    logger.error('====start of error====')
    logger.error('error handler:', error.message)
    logger.error('====end of error====')
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const requestLogger = (request, response, next) => {
    logger.info('---Start---')
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    next()
    logger.info('logger ends here')
}

module.exports = {
    errorHandler,
    unknownEndpoint,
    requestLogger
}