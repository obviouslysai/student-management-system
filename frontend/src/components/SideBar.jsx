import { NavLink } from 'react-router-dom';
import './sidebar.css';

const SideBar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/" className="sidebar-link">Login</NavLink>
      <NavLink to="/register" className="sidebar-link">Register</NavLink>
      <NavLink to="/departments" className="sidebar-link">Departments</NavLink>
      <NavLink to="/students" className="sidebar-link">Students</NavLink>
      <NavLink to="/reports" className="sidebar-link">Reports</NavLink>
    </div>
  );
};

export default SideBar;
