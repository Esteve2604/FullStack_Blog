const fp = require('lodash/fp');
const totalLikes = (listOfBlogs) => {
    let accumulator = 0
    listOfBlogs.forEach(element => {
        accumulator += element.likes
    })
    return accumulator
}
const favoriteBlog = (listOfBlogs) => {
    let mostFav=0;
    let maxLikes=0;
    if(listOfBlogs.length === 0){
        return {}
    }
    listOfBlogs.forEach((element,index) => {
        if(element.likes >= maxLikes){
            maxLikes=element.likes
            mostFav=index
        }
    })
    return {
        title: listOfBlogs[mostFav].title,
        author: listOfBlogs[mostFav].author,
        likes: listOfBlogs[mostFav].likes
    }
}
const mostaux = (listOfBlogs, thing) => {
    let most = 0
    let mostauthor = {}
    for (const property in listOfBlogs) {
        if (listOfBlogs[property] > most) {
            most = listOfBlogs[property]
            mostauthor.author = property
            mostauthor[thing] = listOfBlogs[property]
        }
    }
    return mostauthor
}
const mostBlogs = (listOfBlogs) => {
    const author = listOfBlogs.map(x => x.author)
    let authors = {}
    author.forEach(element => {
        authors.hasOwnProperty(element) ? authors[element]++ : authors[element] = 1
    });
    return mostaux(authors, 'blogs')
}
const mostLiked = (listOfBlogs) => {
    const authLik = listOfBlogs.map(x => {
        return {
            'author': x.author,
            'likes': x.likes
        }
    })
    let totalLike = {}
    authLik.forEach(element => {
        totalLike.hasOwnProperty(element.author) ? totalLike[element.author]+=element.likes : totalLike[element.author] = element.likes
    });
    
    return mostaux(totalLike, 'likes')
}

module.exports = { totalLikes, favoriteBlog, mostBlogs, mostLiked }