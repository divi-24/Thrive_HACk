import React, {useEffect, useState, useCallback, useRef} from "react";
import axios from "axios";
import "../../tailwind.css"; 
import "../../assets/css/Developer/Applications.css";
import { FaEllipsisV, FaTrashAlt, FaRedo, FaBookmark, FaTimes, FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave, FaLaptopCode } from "react-icons/fa";
import Header from "../../components/Header";

const LoadingSkeleton = () => (
    <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Loading your applications...</p>
    </div>
);

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("applied");
    const [loading, setLoading] = useState(true);
    const loggedInDeveloperId = localStorage.getItem("developerId");
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredApplications, setFilteredApplications] = useState([]);

    const fetchApplications = useCallback(async () => {
        try {
            const response = await axios.get('https://thrive-xbzt.onrender.com/api/developer/applications', {
                headers: {
                    "developer-id": loggedInDeveloperId
                },
            });
            
            let apps = [];
            switch(activeTab) {
                case "rejected":
                    apps = response.data.rejectedApplications.map((job) => ({
                        ...job,
                        jobId: job.jobId || job._id,
                        status: "Rejected"
                    }));
                    break;
                case "bookmarked":
                    apps = response.data.onHoldApplications.map((job) => ({
                        ...job,
                        jobId: job.jobId || job._id,
                        status: "Bookmarked"
                    }));
                    break;
                case "applied":
                    apps = [
                        ...response.data.appliedApplications.map((job) => ({
                            ...job,
                            jobId: job.jobId || job._id,
                            status: "Applied"
                        })),
                        ...response.data.underProcessApplications.map((job) => ({
                            ...job,
                            jobId: job.jobId || job._id,
                            status: "Under Process"
                        })),
                        ...response.data.hiredApplications.map((job) => ({
                            ...job,
                            jobId: job.jobId || job._id,
                            status: "Hired"
                        })),
                    ];
                    break;
                default:
                    apps = [];
            }
            setApplications(apps);
            setFilteredApplications(apps);
            setLoading(false);
        } catch(err) {
            setError(err.response?.data?.message || "Error fetching Job Applications");
            setLoading(false);
        }
    }, [activeTab, loggedInDeveloperId]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 2500);
            return () => clearTimeout(timer);
        }

        fetchApplications();

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [activeTab, fetchApplications, error]);

    useEffect(() => {
        const filtered = applications.filter(job => 
            job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.jobDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.requiredSkills.some(skill => 
                skill.toLowerCase().includes(searchTerm.toLowerCase())
            ) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.workMode.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredApplications(filtered);
    }, [searchTerm, applications]);

    const updateStatus = async (jobId, action) => {
        try {
            setOpenDropdown(null);
            const response = await axios.put('https://thrive-xbzt.onrender.com/api/developer/applications', {
                jobId,
                action
            }, {
                headers: {
                    "developer-id": loggedInDeveloperId
                },
            });
            console.log(response.data?.message);
            await fetchApplications();
        } catch(error) {
            setError(error.response?.data?.message || "Error in updating the job application");
        }
    };

    if (loading) {
        return (
            <div className="applications-container">
                <Header />
                <div className="content-wrapper">
                    <LoadingSkeleton />
                </div>
            </div>
        );
    }

    return (
        <div className="applications-container">
            <Header />
            <div className="content-wrapper">
                <div className="tab-container">
                    <button
                        className={`tab-button ${activeTab === "rejected" ? "active" : ""}`}
                        onClick={() => setActiveTab("rejected")}
                    >
                        <FaTimes /> Jobs Rejected
                        <span className="badge">{applications.length}</span>
                    </button>
                    <button
                        className={`tab-button ${activeTab === "bookmarked" ? "active" : ""}`}
                        onClick={() => setActiveTab("bookmarked")}
                    >
                        <FaBookmark /> Jobs Bookmarked
                        <span className="badge">{applications.length}</span>
                    </button>
                    <button
                        className={`tab-button ${activeTab === "applied" ? "active" : ""}`}
                        onClick={() => setActiveTab("applied")}
                    >
                        <FaBriefcase /> Jobs Applied
                        <span className="badge">{applications.length}</span>
                    </button>
                </div>

                {error && <div className="error-message-">{error}</div>}

                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by job title, description, skills, location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Description</th>
                                <th>Required Skills</th>
                                <th>Salary Range</th>
                                <th>Work Mode</th>
                                <th>Location</th>
                                <th>Deadline</th>
                                {activeTab === "applied" && <th>Status</th>}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredApplications.map((job) => (
                                <tr key={job.jobId}>
                                    <td>
                                        <div className="job-title">
                                            <FaBriefcase className="icon" />
                                            {job.jobTitle}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="job-description">
                                            {job.jobDescription.length > 100
                                                ? `${job.jobDescription.substring(0, 100)}...`
                                                : job.jobDescription}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="skills-container">
                                            {job.requiredSkills.map((skill, index) => (
                                                <span key={index} className="skill-tag">
                                                    <FaLaptopCode className="icon" />
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="salary-range">
                                            <FaMoneyBillWave className="icon" />
                                            {job.salaryRange}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="work-mode">
                                            {job.workMode}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="location">
                                            <FaMapMarkerAlt className="icon" />
                                            {job.location}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="deadline">
                                            <FaCalendarAlt className="icon" />
                                            {new Date(job.lastDateToApply).toLocaleDateString()}
                                        </div>
                                    </td>
                                    {activeTab === "applied" && (
                                        <td>
                                            <div className={`status-badge status-${job.status.toLowerCase().replace(" ", "-")}`}>
                                                {job.status}
                                            </div>
                                        </td>
                                    )}
                                    <td>
                                        <div className="dropdown-container" ref={dropdownRef}>
                                            {job.status !== "Hired" && (
                                                <>
                                                    <FaEllipsisV
                                                        className="dropdown-icon"
                                                        onClick={() => setOpenDropdown(openDropdown === job.jobId ? null : job.jobId)}
                                                    />
                                                    {openDropdown === job.jobId && (
                                                        <select
                                                            className="dropdown-select"
                                                            onChange={(e) => {
                                                                const action = e.target.value;
                                                                if (action) {
                                                                    updateStatus(job.jobId, action);
                                                                }
                                                                e.target.value = "";
                                                            }}
                                                            value=""
                                                        >
                                                            <option value="" hidden>Select Action</option>
                                                            {activeTab === "rejected" && (
                                                                <>
                                                                    <option value="delete">🗑 Delete</option>
                                                                    <option value="apply">🔄 Re-Apply</option>
                                                                </>
                                                            )}
                                                            {activeTab === "bookmarked" && (
                                                                <>
                                                                    <option value="apply">✅ Apply</option>
                                                                    <option value="reject">❌ Remove</option>
                                                                </>
                                                            )}
                                                            {activeTab === "applied" && job.status === "Applied" && (
                                                                <option value="withdraw">❌ Withdraw</option>
                                                            )}
                                                        </select>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredApplications.length === 0 && (
                        <div className="no-results">
                            <p>No applications found in this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Applications;