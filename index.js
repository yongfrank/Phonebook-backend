require('dotenv').config()

const express = require('express')
const Person = require('./models/person')

const cors = require('cors')
var morgan = require('morgan')

const app = express()

morgan.token('content', function (req) { return JSON.stringify(req.body) })

const requestLogger = (request, response, next) => {
    console.log('---Start---')
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    next()
}

app.use(express.json())

// request.body is undefined! if it's on the top of express.json()
app.use(requestLogger)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(cors())
app.use(express.static('build'))



// let persons = [
//     {
//         "id": 1,
//         "name": "Arto Hellas",
//         "number": "040-123456"
//     },
//     {
//         "id": 2,
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523"
//     },
//     {
//         "id": 3,
//         "name": "Dan Abramov",
//         "number": "12-43-234345"
//     },
//     {
//         "id": 4,
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122"
//     }
// ]

// mongoose.set('strictQuery', false)

// <=> mongoose.connection.close()
// mongoose.connect(url)

// const personSchema = new mongoose.Schema({
//     name: String,
//     number: String,
// })

// personSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//         returnedObject.id = returnedObject._id.toString()
//         delete returnedObject._id
//         delete returnedObject.__v
//     }
// })

// const Person = mongoose.model('Person', personSchema)

app.get('/', (request, response) => {
    response.send('<h1>Phone Book</h1>')
})

app.get('/api/persons', (request, response) => {
    // response.json(persons)
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    Person.find({}).then(p => {
        const persons = p
        const content = `Phonebook has info for ${persons.length} people<br>${Date()}`
        response.send(content)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
        // console.log(error)
        // response.status(400).send({ error: 'malformed id'})
        // response.send(`<h1>Not Found in Database</h1><p>${error.message}</p>`)
        // })

    // const id = Number(request.params.id)
    // const person = persons.find(person => person.id === id)
    // console.log(person)
    // if (person) {
    //     response.json(person)
    // } else {
    //     response.status(404)
    //     response.send('404 Not Found')
    // }
})

app.delete('/api/persons/:id', (request, response, next) => {
    // const id = Number(request.params.id)
    // persons = persons.filter(person => person.id !== id)
    Person.findByIdAndDelete(request.params.id)
        .then(() => {
            // response.json(updatedPerson)
            response.status(204).end()
        })
        .catch(error => next(error))
})

// const generateId = (persons) => {
//     // Math.max(...persons.map(person => person.id))
//     const maxId = persons.length > 0
//         ? Math.floor(Math.random() * 1000000)
//         : 0
//     return maxId + 1
// }

app.post('/api/persons', (request, response, next) => {
    const person = request.body
    // const body = request.body
    // if (body.content === undefined) {
    //     return response.status(400).json({ error: 'content missing'})
    // }
    // if (!person.name || !person.number) {
    //     return response.status(400).json({ error: 'something missing' })
    // }
    // else if (Person.find(p => p.name === person.name)) {
    //     return response.status(400).json({ error: "name must be unique"})
    // }

    const newPerson = new Person({
        name: person.name,
        number: person.number,
    })

    // person.id = generateId(persons)
    newPerson.save().then(savedPersons => {
        response.json(savedPersons)
    })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    // const newPerson = {
    //     name: person.name,
    //     number: person.number
    // }
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
    // persons = persons.map(person => {
    //     if(person.id == newPerson.id) {
    //         return {...person, number: newPerson.number}
    //     }
    //     return person
    // })
    // response.json(newPerson)
})

const errorHandler = (error, request, response, next) => {
    console.error('====start of error====')
    console.error('error handler:', error.message)
    console.error('====end of error====')
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

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`running on ${PORT}`)
})