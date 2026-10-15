const Department = require('../models/department');

exports.getDepartments = async (req, res) => {
  const depts = await Department.find();
  res.json(depts);
};

exports.createDepartment = async (req, res) => {
  const { deptname, location } = req.body;
  const newDept = new Department({ deptname, location });
  await newDept.save();
  res.status(201).json(newDept);
};

exports.updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { deptname, location } = req.body;
  const updated = await Department.findByIdAndUpdate(id, { deptname, location }, { new: true });
  res.json(updated);
};

exports.deleteDepartment = async (req, res) => {
  await Department.findByIdAndDelete(req.params.id);
  res.json({ message: 'Department deleted' });
};
