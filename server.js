const express = require("express");
const mongoose = require("mongoose");   
const cors = require("cors");
require("dotenv").config();

const jobRoutes = require("./routes/jobRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB || process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobRoutes);

async function startServer() {
    if (!mongoUri) {
        console.error("MongoDB connection string is missing. Add MONGODB=<your MongoDB URI> to .env");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);

        if (err.code === "ECONNREFUSED" && err.syscall === "querySrv") {
            console.error("DNS could not resolve the MongoDB Atlas SRV record. Check the cluster hostname, internet/DNS access, VPN/firewall settings, or use the standard mongodb:// connection string from Atlas.");
        }

        process.exit(1);
    }
}

startServer();
