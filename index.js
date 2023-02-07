/*
 * @Author: Frank Chu
 * @Date: 2023-02-03 19:11:50
 * @LastEditors: Frank Chu
 * @LastEditTime: 2023-02-07 16:56:57
 * @FilePath: /Phonebook-backend/index.js
 * @Description: 
 * 
 */

const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
    logger.info(`running on ${config.PORT}`)
})