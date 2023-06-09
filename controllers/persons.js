/*
 * @Author: Frank Chu
 * @Date: 2023-02-07 16:44:38
 * @LastEditors: Frank Chu
 * @LastEditTime: 2023-02-07 20:17:26
 * @FilePath: /Phonebook-backend/controllers/persons.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name}, All Rights Reserved. 
 */

// The module exports the router to be available for all consumers of the module.
// https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing
const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (request, response) => {
    // response.send('<h1>Phone Book</h1>')
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

personsRouter.get('/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

personsRouter.post('/', (request, response, next) => {
    // const person = request.body

    // const newPerson = new Person({
    //     name: person.name,
    //     number: person.number,
    // })
    const newPerson = new Person(request.body)
    console.log('log here: ', newPerson)

    
    // person.id = generateId(persons)
    newPerson.save().then(savedPersons => {
        response.json(savedPersons)
    })
        .catch(error => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => {
            // response.json(updatedPerson)
            response.status(204).end()
        })
        .catch(error => next(error))
})


personsRouter.put('/:id', (request, response, next) => {
    const { name, number } = request.body

    // console.log(request.body, request.params)
    // We added the optional { new: true } parameter,
    // which will cause our event handler to be called
    // with the new modified document instead of the original.
    Person.findByIdAndUpdate(
        request.params.id,
        { name, number },
        // https://fullstackopen.com/en/part3/validation_and_es_lint
        // validations are not run by default when findOneAndUpdate is executed.
        { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

module.exports = personsRouter