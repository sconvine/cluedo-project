import { Route, Routes } from 'react-router-dom';
import { CluedoProvider } from './components/CluedoContext';
import GameBoard from './pages/GameBoard';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const customTheme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: ['Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Verdana', 'Tahoma', 'Arial'],
          color: '#363636'
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <CluedoProvider>
        <Routes>
          <Route path="/" element={<GameBoard />} />
        </Routes>
      </CluedoProvider>
    </ThemeProvider>
  );
}

export default App;
