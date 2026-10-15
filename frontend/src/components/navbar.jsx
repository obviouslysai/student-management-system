import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">🎓 Student Management</div>
      <ul className="navbar-links">
        <li><Link to="/departments">Departments</Link></li>
        <li><Link to="/students">Students</Link></li>
        <li><Link to="/reports">Reports</Link></li>
        <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default NavBar;
