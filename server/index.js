const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();


// Middleware to log requests in JSON format
const logRequests = (req, res, next) => {
    const log = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
        ip: req.ip,
    };
    fs.appendFileSync(
        path.join(__dirname, "logs.json"),
        JSON.stringify(log) + ",\n"
    );
    next();
};

// Middleware for basic authentication for /logs
const authenticateLogs = (req, res, next) => {
    const auth = { username: "admin", password: "password123" }; // Hardcoded credentials

    const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
    const [username, password] = Buffer.from(b64auth, "base64").toString().split(":");

    if (username === auth.username && password === auth.password) {
        return next();
    }

    res.set("WWW-Authenticate", 'Basic realm="401"');
    res.status(401).send("Authentication required.");
};

// Allowed domains
const allowedDomains = ["http://localhost", "http://localhost:5173", "https://mess-finder.vercel.app"];
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedDomains.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
    })
);

app.use(express.json());
app.use(logRequests); // Apply logging middleware

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Introductory homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Logs route with authentication
app.get("/logs", authenticateLogs, (req, res) => {
    const logsPath = path.join(__dirname, "logs.json");
    if (fs.existsSync(logsPath)) {
        res.sendFile(logsPath);
    } else {
        res.status(404).send("No logs found.");
    }
});

// API routes
const listingsRouter = require("./routes/listings");
app.use("/api/listings", listingsRouter);

// Start the server
app.listen(3000, () => console.log("Server running on port 3000"));
