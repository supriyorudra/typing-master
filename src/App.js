import { ToastContainer } from "react-toastify";
import { GlobalStyles } from "./Styles/global";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useTheme } from "./Context/ThemeContext";

import 'react-toastify/dist/ReactToastify.css';
import Home from "./Pages/Home";
import User from "./Pages/User";

function App() {
const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/user" element={<User/>}/>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
