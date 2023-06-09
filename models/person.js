const mongoose = require('mongoose')

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