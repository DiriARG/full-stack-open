import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Todo from './Todo'

test('renderiza el componente aislado', () => {
  const todo = {
    text: 'Aprendiendo docker',
    done: true
  }

  render(<Todo todo={todo} deleteTodo={() => {}} completeTodo={() => {}} />)

  expect(screen.getByText('Aprendiendo docker')).toBeInTheDocument()
})
