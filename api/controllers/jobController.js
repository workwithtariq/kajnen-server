const Job = require('../models/Job');

// Create Job
const createJob = async (req, res) => {
  try {
    const { user, category, subCategory, wage, description, phone } = req.body;

    // Validate required fields
    if (!user || !category || !wage || !description || !phone) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    // Create a new job entry
    const newJob = new Job({ user, category, subCategory, wage, description, phone });
    await newJob.save();

    res.status(201).json(newJob);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Get Jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    // Check if jobs exist
    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found." });
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Delete Job
const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Validate job ID
    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required." });
    }

    // Find and delete the job
    const job = await Job.findByIdAndDelete(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    res.status(200).json({ message: 'Job deleted successfully.' });
  } catch (error) {
    console.error("Error deleting job:", error);

    // Handle invalid ObjectId or other database errors
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid job ID." });
    }

    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = { createJob, getJobs, deleteJob };
