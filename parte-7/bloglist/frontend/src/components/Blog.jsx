import { Link } from 'react-router-dom'
import styled from 'styled-components'

const BlogItem = styled.div`
  padding: 10px 5px;
  border: 1px solid #3329bdff;
  margin-top: 15px;
  margin-bottom: 8px;
  border-radius: 4px;
  background: white;

  /* Hover suave */
  transition: background 0.2s ease;
  &:hover {
    background: #e0b677ff;
  }
`

const BlogLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  color: #2c3e50;

  &:hover {
    text-decoration: underline;
  }
`

const Blog = ({ blog }) => {
  return (
    <BlogItem data-testid="blog-item">
      <BlogLink to={`/blogs/${blog.id}`}>
        {blog.title} — {blog.author}
      </BlogLink>
    </BlogItem>
  )
}

export default Blog