import { useState } from 'react'

type Todo = {
  id: number
  text: string
  completed: boolean
}

type Filter = 'all' | 'active' | 'completed'

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  function addTodo() {
    if (!input.trim()) return
    setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }])
    setInput('')
  }

  // BUG: compares id to the whole todo object instead of todo.id
  function toggleTodo(id: number) {
    setTodos(todos.map(todo =>
      todo === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  // TODO: not implemented
  function deleteTodo(_id: number) {}

  // BUG: filter logic is missing — always returns all todos
  const filtered = todos

  return (
    <div style={{ maxWidth: 480, margin: '60px auto', padding: '0 16px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>My Todos</h1>

      {/* Add todo */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="What needs to be done?"
          style={{
            flex: 1, padding: '10px 14px', borderRadius: 8,
            border: '1px solid #ddd', fontSize: 14, outline: 'none'
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: '10px 18px', borderRadius: 8, border: 'none',
            background: '#4f46e5', color: '#fff', fontWeight: 600,
            fontSize: 14, cursor: 'pointer'
          }}>
          Add
        </button>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
        {(['all', 'active', 'completed'] as Filter[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 14px', borderRadius: 6, border: '1px solid #ddd',
              background: filter === f ? '#4f46e5' : '#fff',
              color: filter === f ? '#fff' : '#555',
              fontSize: 13, cursor: 'pointer', textTransform: 'capitalize'
            }}>
            {f}
          </button>
        ))}
      </div>

      {/* Todo list */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.length === 0 && (
          <li style={{ color: '#aaa', fontSize: 14, textAlign: 'center', padding: 24 }}>
            No todos yet.
          </li>
        )}
        {filtered.map(todo => (
          <li
            key={todo.id}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: '#fff', padding: '12px 16px',
              borderRadius: 8, border: '1px solid #eee'
            }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              style={{ width: 16, height: 16, cursor: 'pointer' }}
            />
            <span style={{
              flex: 1, fontSize: 14,
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#aaa' : '#111'
            }}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                background: 'none', border: 'none',
                color: '#ccc', fontSize: 18, cursor: 'pointer', lineHeight: 1
              }}>
              ×
            </button>
          </li>
        ))}
      </ul>

      {/* Footer */}
      {todos.length > 0 && (
        <p style={{ marginTop: 16, fontSize: 13, color: '#aaa' }}>
          {todos.filter(t => !t.completed).length} items left
        </p>
      )}
    </div>
  )
}
