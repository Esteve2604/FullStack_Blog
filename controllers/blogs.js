const blogsRouter = require('express').Router()
const Blog = require('../models/blog')




blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const user=request.user
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: user.id
    })
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
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
})
blogsRouter.delete('/:id', async (request, response, next) => {
    const blogToDelete = await Blog.findById(request.params.id)
    if(!blogToDelete){
        return response.status(400).json({ error: 'This blog doesn\'t exist' })
    }
    if (blogToDelete.user.toString() === request.user.id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } else {
        return response.status(401).json({ error: 'only the user who created the blog can delete it' })
    }
})
blogsRouter.put('/:id', async (request, response) => {
    const blog = {
        likes: request.body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})
module.exports = blogsRouter