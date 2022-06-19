import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { AppRoutes } from './routes';
import './App.css';
import { LightTheme } from './shared/themes';


const App = () => {
  return(
    <ThemeProvider theme={LightTheme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;