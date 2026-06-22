const mongoose = require("mongoose");
const express = require("express");
const routes = express.Router();

const Job = require("../models/job");


routes.get("/", async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
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
        res.status(500).json({ message: err.message });
    }
});

routes.post("/", async (req, res) => {
    try {
        const job = new Job(req.body);
        const newJob = await job.save();

        res.status(201).json(newJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
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