const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
blogSchema.set('toJSON', {
  transform : (document, retunedObject) => {
    retunedObject.id=retunedObject._id.toString()
    delete retunedObject._id
  }
})
module.exports= mongoose.model('blog', blogSchema)