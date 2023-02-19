const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
const userSchema = new mongoose.Schema({
    username:{
        type: String, required: true, unique: true, minLength: 3
    },
    passwordHash: String,
    name: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'blog'
        }
    ]
})
userSchema.plugin(uniqueValidator)
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash

    }
})
module.exports = mongoose.model('User', userSchema)