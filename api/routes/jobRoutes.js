const express = require('express');
const router = express.Router();
const { createJob, getJobs, deleteJob } = require('../controllers/jobController');

// Create Job
router.post('/', createJob);

// Get Jobs
router.get('/', getJobs);

// Delete Job
router.delete('/:id', deleteJob);

module.exports = router;
