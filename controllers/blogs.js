const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    if (!blog.title) {
        return response.status(400).json({
            error: 'title missing'
        })
    }
    if (!blog.url) {
        return response.status(400).json({
            error: 'url missing'
        })
    }
    if (!blog.likes) {
        blog.likes = 0;
    }
    const result = await blog.save()
    response.status(201).json(result)
})
blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch(exception) { //Innecesario, modulo express-async-errors activado
        next(exception)
    }
})
blogsRouter.put('/:id', async (request, response) => {
    const blog= {
        likes: request.body.likes
    }
    const updatedBlog=await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog)
})
module.exports = blogsRouter