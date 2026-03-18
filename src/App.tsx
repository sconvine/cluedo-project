import { Routes, Route, Link } from 'react-router-dom';
import GameBoard from './pages/GameBoard';
import { CluedoProvider } from './components/CluedoContext';

function App() {
    return (
      <CluedoProvider>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
          </ul>
        </nav> */}
        <Routes>
          <Route path="/" element={<GameBoard />} />
        </Routes>
      </CluedoProvider>
    );
}

export default App;
