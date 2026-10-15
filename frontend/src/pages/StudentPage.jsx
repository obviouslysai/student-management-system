// src/pages/StudentPage.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
//import '../styles/FormStyles.css'; // Make sure this is imported
//import '../styles/StudentStyle.css';
const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', joinDate: '', department: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchStudents = async () => {
    const res = await axios.get('http://localhost:5000/api/students');
    setStudents(res.data);
  };

  const fetchDepts = async () => {
    const res = await axios.get('http://localhost:5000/api/departments');
    setDepartments(res.data);
  };

  useEffect(() => {
    fetchStudents();
    fetchDepts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/students/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/api/students', form);
      }
      fetchStudents();
      setForm({ name: '', email: '', joinDate: '', department: '' });
    } catch (error) {
      console.error("Error submitting student:", error);
    }
  };

  const handleEdit = (student) => {
    setForm({
      name: student.name,
      email: student.email,
      joinDate: student.joinDate ? student.joinDate.split('T')[0] : '',
      department: student.department?._id || ''
    });
    setEditingId(student._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      fetchStudents();
    }
  };

  return (
    <>
      <h1 className="page-header">Students Management</h1>

      <div className="card">
        <form onSubmit={handleSubmit} className="form-add-new">
          <input
            className="form-input"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            required
          />
          <input
            type="email"
            className="form-input"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            required
          />
          <input
            type="date"
            className="form-input"
            value={form.joinDate}
            onChange={e => setForm({ ...form, joinDate: e.target.value })}
            required
          />
          <select
            className="form-select"
            value={form.department}
            onChange={e => setForm({ ...form, department: e.target.value })}
            required
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept._id} value={dept._id}>{dept.deptname}</option>
            ))}
          </select>
          <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Add Student'}</button>
        </form>
      </div>

      <div className="card">
        <table className="table-container">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.department?.deptname || 'N/A'}</td>
                <td>{student.joinDate ? new Date(student.joinDate).toLocaleDateString('en-GB') : 'N/A'}</td>
                <td className="actions-cell">
                  <button onClick={() => handleEdit(student)} className="btn btn-edit">Edit</button>
                  <button onClick={() => handleDelete(student._id)} className="btn btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentPage;