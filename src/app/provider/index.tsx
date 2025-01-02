import { BrowserRouter } from './router';
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import "../index.css";

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat',
  },
});

function App() {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <BrowserRouter />
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
