/*
 * @Author: Frank Chu
 * @Date: 2023-02-07 16:45:31
 * @LastEditors: Frank Chu
 * @LastEditTime: 2023-02-17 06:50:03
 * @FilePath: /Phonebook-backend/utils/logger.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name}, All Rights Reserved. 
 */
const info = (...params) => {
    console.log(...params)
}

const error = (...params) => {
    console.error(...params)
}

module.exports = {
    info, error
}