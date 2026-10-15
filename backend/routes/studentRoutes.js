const express = require('express');
const router = express.Router();
const {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentsByDept
} = require('../controllers/studentController');

router.get('/', getStudents);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);
router.get('/department/:deptId', getStudentsByDept); // Optional: list by department

module.exports = router;
