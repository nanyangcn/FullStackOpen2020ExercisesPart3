const mongoose = require('mongoose')
const dotenv = require("dotenv")

dotenv.config()
mongoose.set('useFindAndModify', false)
const urlMongo = process.env.MONGODB_URI

console.log('connecting to', urlMongo)

mongoose
  .connect(urlMongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
      console.log('connected to MongoDB')
  })
  .catch(error => {
      console.log('error connected to MongoDB', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (document, retrunedObject) => {
    retrunedObject.id = retrunedObject._id.toString()
    delete retrunedObject._id
    delete retrunedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)