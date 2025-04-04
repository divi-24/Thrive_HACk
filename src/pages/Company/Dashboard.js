import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaEye, FaBookmark, FaShare, FaBriefcase, FaToggleOn, FaToggleOff } from "react-icons/fa";
import "../../assets/css/Company/Dashboard.css";
import { useNavigate, Link } from "react-router-dom";
import CompanyHeader from "../../components/CompanyHeader";

const CompanyDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [companyName, setCompanyName] = useState(null);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    jobTitle: "",
    jobDescription: "",
    responsibilities: "",
    salaryRange: "",
    workMode: "Remote",
    location: "",
    lastDateToApply: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const [editJobData, setEditJobData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [jobToDelete,  setJobToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const companyId = localStorage.getItem("companyId");

  const navigate = useNavigate(); 

  useEffect(() => {
    // Load bookmarked jobs from localStorage
    const savedBookmarks = localStorage.getItem("companyBookmarkedJobs");
    if (savedBookmarks) {
      setBookmarkedJobs(JSON.parse(savedBookmarks));
    }
    const getCompanyName  = async () => {
      try {
        const response = await axios.get("https://thrive-xbzt.onrender.com/api/company/jobs/companyname", {
          headers : { "company-id" : companyId },
        })
        setCompanyName(response.data.companyName);

      } catch (error) {
        console.error("Error fetching company name:", error);
      }
    }
    const fetchJobs = async () => {
      try {
        const response = await axios.get("https://thrive-xbzt.onrender.com/api/company/jobs", {
          headers: { "company-id" : companyId},
        });
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
    getCompanyName();
  }, [companyId]);

  // Save bookmarks to localStorage when they change
  useEffect(() => {
    localStorage.setItem("companyBookmarkedJobs", JSON.stringify(bookmarkedJobs));
  }, [bookmarkedJobs]);

  // Handle modal input change
  const handleInputChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };
  
  // Submit new job
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);  
    const formattedJob = {
      ...newJob,
      responsibilities: newJob.responsibilities.split(",").map(item => item.trim()), // Convert to array
      requiredSkills: newJob.requiredSkills.split(",").map(item => item.trim()), // Convert to array
    };
    try {
      console.log(formattedJob);
      console.log(companyId);
      const response = await axios.post("https://thrive-xbzt.onrender.com/api/company/jobs/create", formattedJob, {
        headers: { "company-id" : companyId }, //express treats headers as case insensitive
      });
      setJobs([...jobs, response.data.job]); // Update UI
      setShowModal(false);
      setNewJob({
        jobTitle: "",
        jobDescription: "",
        responsibilities: "",
        requiredSkills: "",
        salaryRange: "",
        workMode: "Remote",
        location: "",
        lastDateToApply: "",
      });
    } catch (error) {
      console.error("Error creating job:", error);
    }
    setSubmitting(false);
  };
  



  const confirmDeleteJob = (job) => {
    setJobToDelete(job);
    setShowDeleteModal(true);
  };
  // Delete a job posting
  const deleteJob = async () => {
    try {
      await axios.delete(`https://thrive-xbzt.onrender.com/api/company/jobs/${jobToDelete._id}`);
      setJobs(jobs.filter((job) => job._id !== jobToDelete._id)); // Remove from UI
      setShowDeleteModal(false);
      setJobToDelete(null);
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

const editJob = (job) => {
  setEditJobData(job);
  setShowEditModal(true);
};
const handleEditInputChange = (e) => {
  setEditJobData({...editJobData, [e.target.name] : e.target.value});
};

const handleEditSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.put(`https://thrive-xbzt.onrender.com/api/company/jobs/${editJobData._id}`, editJobData);
    setJobs(jobs.map(job => (job._id === editJobData._id ? response.data.job : job)));
    setShowEditModal(false);
  }catch(error){
    console.error("Error updating job: ", error);
  }
};

const toggleJobApplicationStatus = async (jobId, currentStatus) => {
  try {
    const response = await axios.patch(`https://thrive-xbzt.onrender.com/api/company/jobs/${jobId}`, {
      acceptingApplications: !currentStatus,
    });

    setJobs(jobs.map(job => job._id === jobId ? response.data.job : job));
  } catch (error) {
    console.error("Error updating job status:", error);
  }
};

const toggleBookmark = (job) => {
  setBookmarkedJobs(prev => {
    const isBookmarked = prev.some(item => item._id === job._id);
    if (isBookmarked) {
      return prev.filter(item => item._id !== job._id);
    } else {
      return [...prev, job];
    }
  });
};

const shareJob = async (job) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: job.jobTitle,
        text: job.jobDescription,
        url: window.location.href
      });
    } catch (err) {
      console.error("Error sharing:", err);
    }
  } else {
    // Fallback for browsers that don't support Web Share API
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl)
      .then(() => alert("Job link copied to clipboard!"))
      .catch(err => console.error("Error copying to clipboard:", err));
  }
};

  return (
    <div>
      <CompanyHeader/>
      <div className="container mt-3 company-dashboard">
        <div className="dashboard-title">
          <FaBriefcase />
          <h1>Job Listings</h1>
        </div>

        {/* Post Job Button */}
        <div className="text-center">
          <Link to="/company/post-job" className="post-job-btn">
            <FaPlus className="me-2" /> Post a New Job
          </Link>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-text">Loading your job listings...</div>
          </div>
        ) : jobs.length === 0 ? (
          // No Jobs Message
          <div className="no-jobs-message">
            Start by posting a job to find the best talent for your needs.
          </div>
        ) : (
          // Job Listings
          <div className="row">
            {jobs.map((job) => (
              <div className="col-md-6 mb-4" key={job._id}>
                <div className="job-card">
                  {/* Status Badge */}
                  <div className={`status-badge ${!job.acceptingApplications ? 'paused' : ''}`}>
                    {job.acceptingApplications ? 'Now Hiring' : 'Hiring Paused'}
                  </div>

                  {/* Floating Actions */}
                  <div className="floating-actions">
                    <button 
                      className={`floating-btn floating-bookmark-btn ${bookmarkedJobs.some(item => item._id === job._id) ? 'bookmarked' : ''}`}
                      onClick={() => toggleBookmark(job)}
                      aria-label="Bookmark"
                    >
                      <FaBookmark />
                    </button>
                    <button 
                      className="floating-btn floating-share-btn"
                      onClick={() => shareJob(job)}
                      aria-label="Share"
                    >
                      <FaShare />
                    </button>
                  </div>

                  <h5 className="job-title">{job.jobTitle}</h5>
                  <p className="job-description">{job.jobDescription}</p>

                  <div className="job-details">
                    <p>
                      <strong>Responsibilities:</strong>
                      <div className="responsibilities-list">
                        {job.responsibilities.map((resp, index) => (
                          <span key={index} className="responsibility-tag">{resp}</span>
                        ))}
                      </div>
                    </p>
                    
                    <p>
                      <strong>Required Skills:</strong>
                      <div className="skills-list">
                        {job.requiredSkills.map((skill, index) => (
                          <span key={index} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </p>

                    <p>
                      <strong>Salary Range:</strong>
                      <span>{job.salaryRange || "Not disclosed"}</span>
                    </p>

                    <p>
                      <strong>Work Mode:</strong>
                      <span>{job.workMode || "Not Defined"}</span>
                    </p>

                    <p>
                      <strong>Location:</strong>
                      <span>{job.location || "None"}</span>
                    </p>

                    <p>
                      <strong>Last Date:</strong>
                      <span>{new Date(job.lastDateToApply).toLocaleDateString()}</span>
                    </p>
                  </div>

                  <div className="job-actions">
                    <button className="edit-btn" onClick={() => editJob(job)}>
                      <FaEdit /> Edit
                    </button>
                    <button className="delete-btn" onClick={() => confirmDeleteJob(job)}>
                      <FaTrash /> Delete
                    </button>
                    <button 
                      onClick={() => toggleJobApplicationStatus(job._id, job.acceptingApplications)}
                      className={job.acceptingApplications ? "btn btn-success" : "btn btn-secondary"}
                    >
                      {job.acceptingApplications ? "Now Hiring" : "Hiring Paused"}
                    </button>
                    <Link 
                      to={`/company/jobs/${job._id}/applications`} 
                      className="view-applications-btn"
                    >
                      <FaEye /> View Applications
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Job Modal */}
        {showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h4>Create New Job</h4>
                <form onSubmit={handleSubmit}>
                  <input type="text" name="jobTitle" placeholder="Job Title" value={newJob.jobTitle} onChange={handleInputChange} required />
                  <textarea name="jobDescription" placeholder="Job Description" value={newJob.jobDescription} onChange={handleInputChange} required />
                  <input type="text" name="responsibilities" placeholder="Responsibilities (comma-separated)" value={newJob.responsibilities} onChange={handleInputChange} required />
                  <input type="text" name="requiredSkills" placeholder="Required Skills (comma-separated)" value={newJob.requiredSkills} onChange={handleInputChange} required />
                  <input type="text" name="salaryRange" placeholder="Salary Range" value={newJob.salaryRange} onChange={handleInputChange} />
                  <select name="workMode" value={newJob.workMode} onChange={handleInputChange} required>
                    <option value="Remote">Remote</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                  <input type="text" name="location" placeholder="Location" value={newJob.location} onChange={handleInputChange} />
                  <div className="lastDate">
                    <label htmlFor="lastDateToApply"> Last date to apply: </label>
                    <input type="date" name="lastDateToApply" value={newJob.lastDateToApply} onChange={handleInputChange} required />
                  </div>


                  <button type="submit" className="submit-btn" disabled={submitting}>
                    {submitting ? "Submitting..." : "Create Job"}
                  </button>
                  <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                </form>
              </div>
            </div>
         )}

        {showEditModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h4>Edit Job</h4>
              <form onSubmit={handleEditSubmit}>
                <input type="text" name="jobTitle" value={editJobData.jobTitle} onChange={handleEditInputChange} required />
                <textarea name="jobDescription" value={editJobData.jobDescription} onChange={handleEditInputChange} required />
                <input type="text" name="responsibilities" value={editJobData.responsibilities.join(", ")} onChange={handleEditInputChange} required />
                <input type="text" name="requiredSkills" value={editJobData.requiredSkills.join(", ")} onChange={handleEditInputChange} required />
                <input type="text" name="salaryRange" value={editJobData.salaryRange} onChange={handleEditInputChange} />
                <select name="workMode" value={editJobData.workMode} onChange={handleEditInputChange} required>
                  <option value="Remote">Remote</option>
                  <option value="Onsite">Onsite</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                <input type="text" name="location" value={editJobData.location} onChange={handleEditInputChange} />
                <label htmlFor="lastDateToApply"> Last date to apply: </label>
                <input type="date" name="lastDateToApply" value={editJobData.lastDateToApply} onChange={handleEditInputChange} required />
        
                <button type="submit" className="submit-btn">Save Changes</button>
                <button className="cancel-btn" onClick={() => setShowEditModal(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h4>Confirm Job Deletion</h4>
              <p>
                Deleting this job will permanently remove all applications related to it.
                This action <strong>cannot be undone.</strong> Are you sure?
              </p>
              <div className="modal-actions">
                <button className="delete-confirm-btn" onClick={deleteJob}>
                  Yes, Delete
                </button>
                <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>
                  No, Cancel
                </button>
              </div>
            </div>
          </div>
        )}

    </div>
    </div>

  );
};

export default CompanyDashboard;
