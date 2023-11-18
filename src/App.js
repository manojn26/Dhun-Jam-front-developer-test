import "./App.css";
import LoginScreen from "./Screens/LoginScreen";
import DashboardScreen from "./Screens/DashboardScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";

// Global Context for User Details
export const AppContext = createContext();

function App() {
  // Setting State fot User Details
  const [userAuth, setUserAuth] = useState({
    id: "",
    response: "",
  });
  return (
    <AppContext.Provider value={{ userAuth, setUserAuth }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginScreen />} />
          <Route path='/dashboard' element={<DashboardScreen />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
