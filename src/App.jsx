import { Route, BrowserRouter as Router, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from '@chakra-ui/react';
import Index from "./pages/Index.jsx";
import DeveloperProfile from './pages/DeveloperProfile.jsx';
import Login from './pages/Login.jsx';

function RouteIndex() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const loginSuccess = queryParams.get('login') === 'success';

  if (loginSuccess) {
    return <Index />;
  } else {
    return localStorage.getItem('auth_token') ? <Index /> : <Navigate to="/login" />;
  }
}

const LogoutButton = () => {
  const navigate = useNavigate();
  return (
    <Button colorScheme="red" onClick={() => {
      localStorage.removeItem('auth_token');
      navigate('/login');
    }}>Logout</Button>
  );
};

function App() {
  const isAuthenticated = localStorage.getItem('auth_token');
  
  return (
    <Router>
      {isAuthenticated && <LogoutButton />}
      <Routes>
        <Route exact path="/" element={<RouteIndex />} />
        <Route path="/login" element={<Login />} />
        <Route path="/developer/:developerId" element={<DeveloperProfile />} />
      </Routes>
    </Router>
  );
}

export default App;