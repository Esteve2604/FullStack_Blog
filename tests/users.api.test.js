const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const initialUsers = [
    {
        username: "buenas",
        passwordHash: "$2b$10$7XGsldrI39ccDtdQIxCFO.ahe1biJXGr6qGtaTZTK64XfYkbnH/nW",
        name: "buendia"
    }
]
beforeEach(async () => {
    await User.deleteMany({})
    let UserObject = new User(initialUsers[0])
    await UserObject.save()
})
describe('new users', () => {
    test('adding user works', async () => {
        const user = {
            username: "Hola",
            name: "nose",
            password: "algarrobo"
        }
        await api.post('/api/users').send(user).expect(201)
        const users = await api.get('/api/users').expect(200)
        expect(users.body).toHaveLength(initialUsers.length+1)
        
    })
    test('password too short', async () => {
        const user = {
            username: "alga",
            name: "s",
            password: "a"
        }
        const response = await api.post('/api/users').send(user).expect(400)
        expect(response.body).toEqual({
            error: 'password is too short'
        })
    })
    test('same username mustn\'t be added', async () => {
        const user = {
            username: "buenas",
            name: "s",
            password: "ienfoldsnoifnd"
        }
        await api.post('/api/users').send(user).expect(400)
    })
})