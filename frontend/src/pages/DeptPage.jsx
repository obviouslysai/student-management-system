// src/pages/DeptPage.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/DepartmentPage.module.css';

const DeptPage = () => {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({ deptname: '', location: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchDepts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/departments');
      setDepartments(res.data);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };

  useEffect(() => {
    fetchDepts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // This is the update logic
        await axios.put(`http://localhost:5000/api/departments/${editingId}`, form);
        setEditingId(null); // Clear the editing state
      } else {
        // This is the create logic
        await axios.post('http://localhost:5000/api/departments', form);
      }
      // This runs after a successful save
      setForm({ deptname: '', location: '' });
      fetchDepts();
    } catch (error) {
      // THE FIX IS HERE: We now show an alert if the save fails.
      console.error("Failed to save department:", error);
      alert(`Error: Could not save the department. Please check the console for details.`);
    }
  };

  const handleEdit = (dept) => {
    setForm({ deptname: dept.deptname, location: dept.location });
    setEditingId(dept._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`http://localhost:5000/api/departments/${id}`);
        fetchDepts();
      } catch (error) {
        console.error("Failed to delete department:", error);
      }
    }
  };

  return (
    <>
      <h1 className={styles.pageHeader}>Departments Management</h1>
      <div className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.formAddNew}>
          <input
            className={styles.formInput}
            value={form.deptname}
            onChange={e => setForm({ ...form, deptname: e.target.value })}
            placeholder="Department Name"
            required
          />
          <input
            className={styles.formInput}
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
            placeholder="Location"
            required
          />
          <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
            {/* This logic correctly changes the button text */}
            {editingId ? 'Update' : 'Add'}
          </button>
        </form>
      </div>
      
      <div className={styles.card}>
        <table className={styles.tableContainer}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept._id}>
                <td>{dept.deptname}</td>
                <td>{dept.location}</td>
                <td className={styles.actionsCell}>
                  <button onClick={() => handleEdit(dept)} className={`${styles.btn} ${styles.btnPrimary}`}>Edit</button>
                  <button onClick={() => handleDelete(dept._id)} className={`${styles.btn} ${styles.btnDelete}`}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DeptPage;
