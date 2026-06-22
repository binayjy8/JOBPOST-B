const mongoose = require("mongoose");
const express = require("express");
const routes = express.Router();

const Job = require("../models/job");

routes.get("/", async (req, res) => {
    try {
        const jobs = await Job.find();

        if (jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found"
            });
        }

        res.status(200).json(jobs);

    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

routes.get("/:id", async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.json(job);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

routes.post("/", async (req, res) => {
    try {
        const {
            title,
            company,
            location,
            salary,
            jobType,
            description,
            qualifications
        } = req.body;

        if (
            !title ||
            !company ||
            !location ||
            !salary ||
            !jobType ||
            !description ||
            !qualifications
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (salary <= 0) {
            return res.status(400).json({
                message: "Salary must be greater than 0"
            });
        }

        if (
            !Array.isArray(qualifications) ||
            qualifications.length === 0
        ) {
            return res.status(400).json({
                message: "Qualifications must be a non-empty array"
            });
        }

        const existingJob = await Job.findOne({
            title,
            company,
            location
        });

        if (existingJob) {
            return res.status(400).json({
                message: "This job already exists for this company"
            });
        }

        const job = new Job({
            title,
            company,
            location,
            salary,
            jobType,
            description,
            qualifications
        });

        const newJob = await job.save();

        res.status(201).json(newJob);

    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

routes.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid job ID"
            });
        }

        const deletedJob = await Job.findByIdAndDelete(id);

        if (!deletedJob) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.json({
            message: "Job deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = routes;