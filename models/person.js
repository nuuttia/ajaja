const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('connected')
    })
    .catch((error) => {
        console.log('error connecting:', error.message)
    })


    mongoose.set('useCreateIndex', true)

const phoneSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 0,
        required: true,
        unique: true
    },
    number: {
        type: String,
        minlength: 0,
        required: true,
    },
    id: String,
})
phoneSchema.plugin(uniqueValidator)

phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Person', phoneSchema)
