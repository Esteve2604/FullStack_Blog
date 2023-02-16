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
const mostBlogs = (listOfBlogs) => {
    console.log(fp.countBy(listOfBlogs)('author'));
    
}

module.exports = { totalLikes, favoriteBlog }