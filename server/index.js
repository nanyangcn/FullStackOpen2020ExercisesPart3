const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

const Person = require('./models/person')

dotenv.config()

const app = express()

app.use(express.static(path.resolve(__dirname, '../react_ui/build')))
app.use(cors())
app.use(express.json())

morgan.token('postRes', (req) => JSON.stringify(req.body))
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
  } else {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  }
}))

// let persons = [
//   {
//     "name": "Arto Hellas",
//     "number": "040-123456",
//     "id": 1
//   },
//   {
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523",
//     "id": 2
//   },
//   {
//     "name": "Dan Abramov",
//     "number": "12-43-234345",
//     "id": 3
//   },
//   {
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122",
//     "id": 4
//   }
// ]

app.get('/info', (req, res, next) => {
  Person
    .find({})
    .then(response => {
      res.send(`
        <p>Phonebook has info for ${response.length} people</p>
        <p>${new Date()}</p>
      `)
    })
    .catch(error => {
      next(error)
    })
})

app.get('/api/persons', (req, res, next) => {
  Person
    .find({})
    .then(response => {
      res.json(response)
    })
    .catch((error) => {
      next(error)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  // const id = Number(req.params.id)
  // const person = persons.find(person => person.id === id)

  // if (person) {
  //   res.json(person)
  // }
  // else {
  //   res.status(404).end()
  // }
  Person
    .findById(req.params.id)
    .then(person => {
      console.log(person)
      if (person) {
        res.json(person)
      } else {
        res.status(404).send('This Id does not exist')
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  // const id = Number(req.params.id)
  // const personsFilter = persons.filter(person => person.id !== id)

  // if (persons.length === personsFilter.length) {
  //   res.status(404).end()
  // }
  // else {
  //   persons = personsFilter
  //   res.status(204).end()
  // }

  Person
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => {
      next(error)
    })
})

app.post('/api/persons', (req, res, next) => {
  const newPerson = req.body

  // const newPersonId = () => {
  //   // if (persons.length === 0)
  //   //   return(1)
  //   // else
  //   //   return(Math.max(...persons.map(person => person.id)) + 1)
  //   return(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER))
  // }

  if (newPerson.name === '' || !newPerson.name || newPerson.number === '' || !newPerson.number) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }

  // if (persons.findIndex(person => person.name === newPerson.name) !== -1) {
  //   return res.status(400).json({
  //     error: 'name must be unique'
  //   })
  // }
  // newPerson.id = newPersonId()
  // persons = persons.concat(newPerson)
  // res.json(newPerson)

  const person = new Person({
    name: newPerson.name,
    number: newPerson.number
  })

  person
    .save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch((error) => {
      next(error)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  // const updataId = Number(req.params.id)

  // const updataIndex = persons.findIndex(person => person.id == updataId)

  // if (updataIndex === -1) {
  //   return res.status(404).end()
  // }

  // persons[updataIndex].name = req.body.name
  // persons[updataIndex].number = req.body.number

  // res.json(req.body)
  const person = {
    name: req.body.name,
    number: req.body.number
  }

  Person
    .findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(person => {
      res.json(person)
    })
    .catch((error) => {
      console.log(error)
      next(error)
    })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
