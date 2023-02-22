const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }
]
const initialUsers = [
    {
        username: "buenas",
        password: "alga",
        name: "buendia"
    }
]
let token=null
beforeEach(async () => {
    await User.deleteMany({})
    await api.post('/api/users').send(initialUsers[0])
    const authorizedUser= await api.post('/api/login').send({username: initialUsers[0].username, password: initialUsers[0].password})
    token = authorizedUser.body.token
    await Blog.deleteMany({})
    let BlogObject = new Blog(initialBlogs[0])
    await BlogObject.save()
    BlogObject = new Blog(initialBlogs[1])
    await BlogObject.save()
})
describe('get blogs', () => {
    test('response and length', async () => {
        const response = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response.body).toHaveLength(initialBlogs.length)

    }, 1000000) //aumenta el timeOut
    test('id is defined', async () => {
        const response = await api.get('/api/blogs')
        console.log(response.body)
        response.body.forEach(blog => expect(blog.id).toBeDefined())
    })
})
describe('post blogs', () => {
    test('post works and likes don\'t change', async () => {
        const objectSent = {
            "title": "buenas",
            "author": "tardes",
            "url": "jesucristo",
            "likes": 14
        }
        const response = await api.post('/api/blogs').send(objectSent).set('authorization',`Bearer ${token}`).expect(201)
        expect(response.body.likes).toBe(objectSent.likes)
        const verify = await api.get('/api/blogs')
        expect(verify.body).toHaveLength(initialBlogs.length + 1)
    })
    test('post with missing likes', async () => {
        const objectSent = {
            "title": "dia",
            "author": "quiensabra",
            "url": "nose",
        }
        const response = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(objectSent).expect(201)
        expect(response.body.likes).toBe(0)
    })
    test('post with missing url or title returns 400 status', async () => {
        const objectSent1 = {
            "author": "quiensabra",
            "url": "nose",
        }
        const objectSent2 = {
            "title": "dia",
            "author": "quiensabra",
        }
        await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(objectSent1).expect(400)
        await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(objectSent2).expect(400)
    })
    test('token not provided return 401', async () => {
        const objectSent = {
            "title": "buenas",
            "author": "tardes",
            "url": "jesucristo",
            "likes": 14
        }
        await api.post('/api/blogs').send(objectSent).expect(401)
    })
    test('wrong token not provided return 401', async () => {
        const objectSent = {
            "title": "buenas",
            "author": "tardes",
            "url": "jesucristo",
            "likes": 14
        }
        await api.post('/api/blogs').set('Authorization', `Bearer 157s1d`).send(objectSent).expect(401)
    })
})
describe('delete blogs', () => {
    test('delete blog [1]', async () => {
        const BlogToDelete = await Blog.find({ title: "Type wars" })
        await api.delete(`/api/blogs/${BlogToDelete[0].id}`).expect(204)
    })
})
describe('update blogs', () => {
    test('update blog[0]', async () => {
        const BlogToUpdate = await Blog.find({ title: "TDD harms architecture" })
        const updatedBlog = await api.put(`/api/blogs/${BlogToUpdate[0].id}`).send({ likes: 15 })
        expect(updatedBlog.body).toEqual({
            id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 15,
            __v: 0
        })
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
test('there are two Blogs', async () => {
    const response = await api.get('/api/Blogs')

    expect(response.body).toHaveLength(2)
})