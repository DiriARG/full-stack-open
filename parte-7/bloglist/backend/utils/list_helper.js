const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((suma, blog) => suma + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const blogMasLikeado = blogs.reduce((max, blog) =>
    blog.likes > max.likes ? blog : max,
  )

  return {
    title: blogMasLikeado.title,
    author: blogMasLikeado.author,
    likes: blogMasLikeado.likes,
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const agrupacion = _.groupBy(blogs, 'author')

  const conteoAutores = _.map(agrupacion, (blogsDelAutor, nombreAutor) => ({
    author: nombreAutor,
    blogs: blogsDelAutor.length,
  }))

  return _.maxBy(conteoAutores, 'blogs')
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const agrupacion = _.groupBy(blogs, 'author')

  const likesPorAutor = _.map(agrupacion, (blogsDelAutor, nombreAutor) => ({
    author: nombreAutor,
    likes: _.sumBy(blogsDelAutor, 'likes'),
  }))

  return _.maxBy(likesPorAutor, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
