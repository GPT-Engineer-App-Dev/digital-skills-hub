import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import DeveloperProfile from './pages/DeveloperProfile.jsx';
import Login from './pages/Login.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={localStorage.getItem('auth_token') ? <Index /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/developer/:developerId" element={<DeveloperProfile />} />
      </Routes>
    </Router>
  );
}

export default App;