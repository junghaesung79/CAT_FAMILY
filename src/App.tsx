import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>CAT FAMILY</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            TypeScript + React 프로젝트가 준비되었습니다!
          </p>
        </div>
      </header>
    </div>
  )
}

export default App

