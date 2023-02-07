/*
 * @Author: Frank Chu
 * @Date: 2023-02-06 12:24:55
 * @LastEditors: Frank Chu
 * @LastEditTime: 2023-02-07 15:00:46
 * @FilePath: /Phonebook-backend/mongo.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name}, All Rights Reserved.
 */
const mongoose = require('mongoose')

let dbMethod = 0
if (process.argv.length < 3) {
    console('give password as argument')
    process.exit(1)
} else if (process.argv.length < 5) {
    dbMethod = 1
}

const password = process.argv[2]
const nameToBeCreated = process.argv[3]
const phoneNumberToBeCreated = process.argv[4]

// url for mongoDB
const url = `mongodb+srv://frank:${password}@cluster0.nrmdydu.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

// <=> mongoose.connection.close()
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

// 0 -> add 1 -> query
if (dbMethod === 0) {
    const person = new Person({
        name: nameToBeCreated,
        number: phoneNumberToBeCreated,
    })
    person.save().then(() => {
        console.log(`added ${nameToBeCreated} number ${phoneNumberToBeCreated} to phonebook`)
        // mongoose.connect(url)
        // https://fullstackopen.com/en/part3/saving_data_to_mongo_db#mongo-db
        // If the connection is not closed, the program will never finish its execution.
        mongoose.connection.close()
    })
} else if (dbMethod === 1) {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(note => {
            console.log(note.name, note.number)
        })
        mongoose.connection.close()
    })
}

