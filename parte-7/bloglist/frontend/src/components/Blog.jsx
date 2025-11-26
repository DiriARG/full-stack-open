import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const estiloDeBlog = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={estiloDeBlog} className="blog" data-testid="blog-item">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  )
}

export default Blog
