// src/App.js

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/navbar';      // <-- ADD THIS LINE
import SideBar from './components/SideBar';        // <-- AND THIS LINE
import Login from './pages/Login';
import Register from './pages/Register';
import DeptPage from './pages/DeptPage';
import StudentPage from './pages/StudentPage';
import Reports from './pages/Reports';
import './App.css'; // Make sure this is also imported

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/register';

  return (
    <>
      {isAuthPage ? (
        // If it's a login/register page, show it without the layout
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      ) : (
        // For all other pages, use this layout structure directly
        <>
          <NavBar />
          <div className="app-container">
            <SideBar />
            <main className="content-container">
              <Routes>
                <Route path="/departments" element={<DeptPage />} />
                <Route path="/students" element={<StudentPage />} />
                <Route path="/reports" element={<Reports />} />
              </Routes>
            </main>
          </div>
        </>
      )}
    </>
  );
}

// We wrap App with Router to use the useLocation hook
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;