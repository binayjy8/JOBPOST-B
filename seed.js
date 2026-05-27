// const mongoose = require("mongoose");
// require("dotenv").config();

// const Job = require("./models/Job");

// const jobs = [
//   {
//     title: "Software Engineer",
//     company: "TechCorp",
//     location: "Bangalore",
//     salary: 1200000,
//     jobType: "Full-time (Remote)",
//     description:
//       "Develop scalable applications using MERN stack.",
//     qualifications: [
//       "React",
//       "Node.js",
//       "MongoDB",
//     ],
//   },

//   {
//     title: "Frontend Developer",
//     company: "Google",
//     location: "Hyderabad",
//     salary: 1500000,
//     jobType: "Full-time (On-site)",
//     description:
//       "Build responsive frontend applications.",
//     qualifications: [
//       "JavaScript",
//       "React",
//       "CSS",
//     ],
//   },
// ];

// mongoose
//   .connect(process.env.MONGODB)
//   .then(async () => {
//     console.log("MongoDB Connected");

//     await Job.insertMany(jobs);

//     console.log("Data Inserted");

//     process.exit();
//   })
//   .catch((err) => {
//     console.log(err);
//   });