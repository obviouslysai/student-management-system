const Student = require('../models/student');

exports.getStudents = async (req, res) => {
  const students = await Student.find().populate('department');
  res.json(students);
};

exports.createStudent = async (req, res) => {
  const { name, email, department, joinDate } = req.body;
  const student = new Student({ name, email, department, joinDate });
  await student.save();
  res.status(201).json(student);
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, department, joinDate } = req.body;
  const updated = await Student.findByIdAndUpdate(id, { name, email, department, joinDate }, { new: true });
  res.json(updated);
};

exports.deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Student deleted' });
};

exports.getStudentsByDept = async (req, res) => {
  const { deptId } = req.params;
  const students = await Student.find({ deptId }).populate('department');
  res.json(students);
};
