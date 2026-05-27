const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  salary: Number,
  jobType: String,
  description: String,
  qualifications: [String],
});


module.exports = mongoose.model("Job", jobSchema);