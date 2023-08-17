const express = require("express");
const app = express();
const linkedIn = require("./index"); // Assuming this is the file containing the LinkedIn job search logic

app.use(express.json());

// Enable CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Endpoint to handle the job search request
app.post("/api/jobs", async (req, res) => {
  try {
    const queryOptions = req.body; // This will contain the query parameters sent from the front-end
    const jobs = await linkedIn.query(queryOptions);
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching job listings:", error);
    res.status(500).json({ error: "An error occurred while fetching job listings" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
