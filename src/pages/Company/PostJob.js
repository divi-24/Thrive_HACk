import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";
import "../../assets/css/Company/PostJob.css";
import CompanyHeader from "../../components/CompanyHeader";

const PostJob = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [jobData, setJobData] = useState({
    jobTitle: "",
    jobDescription: "",
    responsibilities: "",
    requiredSkills: "",
    salaryRange: "",
    workMode: "Remote",
    location: "",
    lastDateToApply: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    const companyId = localStorage.getItem("companyId");
    if (!companyId) {
      setError("Please login as a company to post jobs");
      setSubmitting(false);
      return;
    }

    try {
      const formattedJob = {
        ...jobData,
        responsibilities: jobData.responsibilities.split(",").map(item => item.trim()),
        requiredSkills: jobData.requiredSkills.split(",").map(item => item.trim()),
      };

      const response = await axios.post(
        "https://thrive-xbzt.onrender.com/api/company/jobs/create",
        formattedJob,
        {
          headers: { "company-id": companyId },
        }
      );

      setSuccess("Job posted successfully!");
      setTimeout(() => {
        navigate("/company/dashboard");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error creating job. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <CompanyHeader />
      <div className="post-job-container">
        <div className="post-job-content">
          <h2>
            <FaBriefcase /> Post a New Job
          </h2>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit} className="post-job-form">
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={jobData.jobTitle}
                onChange={handleInputChange}
                placeholder="e.g. Senior Software Engineer"
                required
              />
            </div>

            <div className="form-group">
              <label>Job Description</label>
              <textarea
                name="jobDescription"
                value={jobData.jobDescription}
                onChange={handleInputChange}
                placeholder="Describe the role and responsibilities"
                required
              />
            </div>

            <div className="form-group">
              <label>Responsibilities (comma-separated)</label>
              <input
                type="text"
                name="responsibilities"
                value={jobData.responsibilities}
                onChange={handleInputChange}
                placeholder="e.g. Lead team projects, Code review, System design"
                required
              />
            </div>

            <div className="form-group">
              <label>Required Skills (comma-separated)</label>
              <input
                type="text"
                name="requiredSkills"
                value={jobData.requiredSkills}
                onChange={handleInputChange}
                placeholder="e.g. React, Node.js, MongoDB"
                required
              />
            </div>

            <div className="form-group">
              <label>Salary Range</label>
              <input
                type="text"
                name="salaryRange"
                value={jobData.salaryRange}
                onChange={handleInputChange}
                placeholder="e.g. $80,000 - $120,000"
              />
            </div>

            <div className="form-group">
              <label>Work Mode</label>
              <select
                name="workMode"
                value={jobData.workMode}
                onChange={handleInputChange}
                required
              >
                <option value="Remote">Remote</option>
                <option value="Onsite">Onsite</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={jobData.location}
                onChange={handleInputChange}
                placeholder="e.g. New York, NY"
              />
            </div>

            <div className="form-group">
              <label>Last Date to Apply</label>
              <input
                type="date"
                name="lastDateToApply"
                value={jobData.lastDateToApply}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="submit-btn"
                disabled={submitting}
              >
                {submitting ? "Posting..." : "Post Job"}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/company/dashboard")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob; 