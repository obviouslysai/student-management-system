const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  deptname: String,
  location: String
});

module.exports = mongoose.model('Department', departmentSchema);
