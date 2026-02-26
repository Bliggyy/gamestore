import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

function Home() {
  return <h1>Welcome to GameStore</h1>
}

function Games() {
  return <h1>Games List</h1>
}

function GameDetails() {
  return <h1>Game Details</h1>
}

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/games">Games</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:id" element={<GameDetails />} />
      </Routes>
    </div>
  )
}

export default App
