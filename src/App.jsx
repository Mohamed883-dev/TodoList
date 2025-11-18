import TodoCard from './Components/TodoCard'
import './App.css'
import "@fontsource/inter";          // Default weight (400)
import "@fontsource/inter/500.css";  // Medium
import "@fontsource/inter/700.css"; 
import { SnackBarProvider } from './Contexts/SnackBarContext';
import TodosProvider from './Contexts/TodosContext';

import { createTheme, ThemeProvider } from "@mui/material/styles";






const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  
});

function App() {

  return (
  <ThemeProvider theme={theme}>
    <TodosProvider>
    <SnackBarProvider>
       <TodoCard/>
    </SnackBarProvider>
    </TodosProvider>
  </ThemeProvider>
  )
}

export default App
