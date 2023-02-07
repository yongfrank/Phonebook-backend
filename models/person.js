const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

// console.log('connecting to', url)

mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    // We can define specific validation rules for each field in the schema:
    // https://fullstackopen.com/en/part3/validation_and_es_lint
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true,
        validate: {
            validator: (vali) => {
                return /\d{2,3}-\d{5,}/.test(vali)
            }
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)