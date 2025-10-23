import TodoCard from './Components/TodoCard'
import './App.css'
import "@fontsource/inter";          // Default weight (400)
import "@fontsource/inter/500.css";  // Medium
import "@fontsource/inter/700.css"; 
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  
});

function App() {

  return (
  <ThemeProvider theme={theme}>
      <TodoCard/>
  </ThemeProvider>
  )
}

export default App
