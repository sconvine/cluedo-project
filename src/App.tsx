import { Routes, Route, Link } from 'react-router-dom';
import GameBoard from './pages/GameBoard';
import { CluedoContext } from './components/CluedoContext';
import { CluedoService } from './scripts/cluedo';

const cluedoService = new CluedoService();

function App() {
    return (
      <CluedoContext.Provider value={cluedoService}>
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
      </CluedoContext.Provider>
    );
}

export default App;
