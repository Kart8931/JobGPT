const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

/* require all the routes here */
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

/* using all the routes here */
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

/* Safely resolve the path to your Frontend/dist folder.
   Using __dirname ensures it always works, even if you start the 
   server from a different directory.
*/
const frontendDistPath = path.join(__dirname, "../../Frontend/dist");

// Serve the static files
app.use(express.static(frontendDistPath));


app.get(/.*/, (_, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
});

module.exports = app;