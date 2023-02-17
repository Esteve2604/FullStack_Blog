const listHelper = require('../utils/list_helper')
const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]
const oneBlog = [
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]
xdescribe('total Likes', () => {
    test('empty list equals 0', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })
    test('oneBlog equals likes of that blog', () => {
        expect(listHelper.totalLikes(oneBlog)).toBe(2)
    })
    test('bigger list right', () => {
        expect(listHelper.totalLikes(blogs)).toBe(36)
    })
})
xdescribe('favorite Blogs', () => {
    test('empty list empty object', () => {
        expect(listHelper.favoriteBlog([])).toEqual({})
    })
    test('oneBlog is favorite', () => {
        expect(listHelper.favoriteBlog(oneBlog)).toEqual({
            title: "Type wars",
            author: "Robert C. Martin",
            likes: 2
        })
    })
    test('bigger list right', () => {
        expect(listHelper.favoriteBlog(blogs)).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        })
    })
})
describe('most Blogs', () => {
    test('empty list empty object', () => {
        expect(listHelper.mostBlogs([])).toEqual({})
    })
    test('oneBlog is favorite', () => {
        expect(listHelper.mostBlogs(oneBlog)).toEqual({
            author: "Robert C. Martin",
            blogs: 1
        })
    })
    test('bigger list right', () => {
        expect(listHelper.mostBlogs(blogs)).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        })
    })
})
describe('most Likes', () => {
    test('empty list empty object', () => {
        expect(listHelper.mostLiked([])).toEqual({})
    })
    test('oneBlog is most liked', () => {
        expect(listHelper.mostLiked(oneBlog)).toEqual({
            author: "Robert C. Martin",
            likes: 2
        })
    })
    test('bigger list right', () => {
        expect(listHelper.mostLiked(blogs)).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})