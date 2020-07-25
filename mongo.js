const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  }

const password = process.argv[2]

const url = 
`mongodb+srv://nuutti:${password}@cluster0.68s1p.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true })

const phoneSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
  })

const Person = mongoose.model('Person', phoneSchema)


if (process.argv[3]){
const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    id: Math.floor(Math.random() * 1000)
})

person.save().then(response =>{
    console.log('toimii')
    mongoose.connection.close()
    })
} else {
Person.find({}).then(result=> {
    console.log("Phonebook")
    result.forEach( person => {
        console.log(person.name, person.number)
    }
    )
    mongoose.connection.close()
})
}