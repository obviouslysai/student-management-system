import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DeptPage from './pages/DeptPage';
import StudentPage from './pages/StudentPage';
import Reports from './pages/Reports';
import SideBar from './components/SideBar';
import NavBar from  './components/navbar';

function App() {
  return (
    <Router>
      <NavBar />
      <div style={{
        display: 'flex',
        minHeight: '90vh',
        overflow: 'hidden',
        backgroundImage: 'url("/bg-pattern.jpg")',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'}}>
        <SideBar />
        <div style={{ padding: '40px', flex: 1 }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/departments" element={<DeptPage />} />
            <Route path="/students" element={<StudentPage />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
