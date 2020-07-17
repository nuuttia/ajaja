const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()


app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

let persons = [
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "nuutti",
    "number": "moro",
    "id": 5
  },
  {
    "name": "jou",
    "number": "01010",
    "id": 6
  },
  {
    "name": "nyt toimii",
    "number": "101010",
    "id": 7
  }
]

app.get('/info', (req, res) => {
  const deit = new Date()
  res.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${deit}</p>`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(persons => persons.id === id)
  if (person) {
    response.json(person)
  } else {
    console.log('vituiks man')
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
  console.log(persons.length)
})

app.post('/api/persons', (req, res) => {
  const person = req.body
  person.id = Math.floor(Math.random()*10000)

  if (!req.body.name){
    return res.status(400).json({ 
      error: 'name is missing' 
    })
  } else if (!req.body.number){
    return res.status(400).json({ 
    error: 'number is missing' 
  })} else if (persons.find(p => p.name === req.body.name)){
    return res.status(400).json({
      error: 'name must be unique'
    })
  }
  persons = persons.concat(person)
  res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})