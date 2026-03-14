import { Routes, Route, Link } from 'react-router-dom';
import GameBoard from './pages/GameBoard';

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<GameBoard />} />
      </Routes>
    </>
  );
}

export default App;
