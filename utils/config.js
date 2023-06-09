/*
 * @Author: Frank Chu
 * @Date: 2023-02-07 16:45:28
 * @LastEditors: Frank Chu
 * @LastEditTime: 2023-02-07 17:15:15
 * @FilePath: /Phonebook-backend/utils/config.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name}, All Rights Reserved. 
 */

// .env file
require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
    PORT, 
    MONGODB_URI
}