const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

var uniqueValidator = require('mongoose-unique-validator')

const urlMongo = process.env.MONGODB_URI

console.log('connecting to', urlMongo)

mongoose
  .connect(urlMongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connected to MongoDB', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    unique: true
  },
  number: {
    type: String,
    validate: {
      validator: value => value.match(/\d/g).length >= 8,
      message: () => 'The number of digital numbers should not less than 8!'
    }
  }
})
personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, retrunedObject) => {
    retrunedObject.id = retrunedObject._id.toString()
    delete retrunedObject._id
    delete retrunedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)