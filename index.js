const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require("dotenv")
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

morgan.token('postRes', (req, res) => JSON.stringify(req.body))
app.use(morgan((tokens, req, res) => {
  if (tokens.method(req, res) === 'POST') {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.postRes(req, res)
    ].join(' ')
  }
  else {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  }
}))

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
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
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  }
  else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const personsFilter = persons.filter(person => person.id !== id)

  if (persons.length === personsFilter.length) {
    res.status(404).end()
  }
  else {
    persons = personsFilter
    res.status(204).end()
  }
})

app.post('/api/persons', (req, res) => {
  const newPerson = req.body

  const newPersonId = () => {
    // if (persons.length === 0)  
    //   return(1)
    // else
    //   return(Math.max(...persons.map(person => person.id)) + 1)
    return(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER))
  }

  if (!newPerson) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  if (newPerson.name === '' || !newPerson.name || newPerson.number === '' || !newPerson.number) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }

  if (persons.findIndex(person => person.name === newPerson.name) !== -1) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }
  newPerson.id = newPersonId()
  persons = persons.concat(newPerson)
  res.json(newPerson)

})

app.put('/api/persons/:id', (req, res) => {
  const updataId = Number(req.params.id)
  
  const updataIndex = persons.findIndex(person => person.id == updataId)

  if (updataIndex === -1) {
    return res.status(404).end()
  }

  persons[updataIndex].name = req.body.name
  persons[updataIndex].number = req.body.number

  res.json(req.body)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})