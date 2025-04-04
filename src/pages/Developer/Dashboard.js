import React, { useEffect, useState, useCallback } from "react";
import axios from "axios"; // Importing icons
import "../../assets/css/Developer/Dashboard.css";  // Importing CSS for styling
import Header from "../../components/Header"
import { FaNewspaper, FaSpinner, FaCalendarAlt, FaGlobe, FaBookmark, FaShareAlt } from "react-icons/fa";

const DeveloperDashboard = () => {
  const [techNews, setTechNews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookmarkedNews, setBookmarkedNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch tech news on component mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://thrive-xbzt.onrender.com/api/developer/dashboard");
        setTechNews(response.data.techNews);
        setError("");
      } catch (err) {
        setError("Failed to load tech news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    
    // Load bookmarked news from localStorage
    const savedBookmarks = localStorage.getItem("bookmarkedNews");
    if (savedBookmarks) {
      setBookmarkedNews(JSON.parse(savedBookmarks));
    }
  }, []);

  // Save bookmarks to localStorage when they change
  useEffect(() => {
    localStorage.setItem("bookmarkedNews", JSON.stringify(bookmarkedNews));
  }, [bookmarkedNews]);

  const toggleBookmark = useCallback((newsItem) => {
    setBookmarkedNews(prev => {
      const isBookmarked = prev.some(item => item.url === newsItem.url);
      if (isBookmarked) {
        return prev.filter(item => item.url !== newsItem.url);
      } else {
        return [...prev, newsItem];
      }
    });
  }, []);

  const shareNews = useCallback((newsItem) => {
    if (navigator.share) {
      navigator.share({
        title: newsItem.title,
        text: newsItem.description,
        url: newsItem.url
      }).catch(err => console.error("Error sharing:", err));
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(newsItem.url)
        .then(() => alert("Link copied to clipboard!"))
        .catch(err => console.error("Error copying to clipboard:", err));
    }
  }, []);

  const filteredNews = techNews.filter(newsItem => {
    if (!newsItem) return false;
    
    if (selectedCategory === "bookmarked") {
      return bookmarkedNews.some(item => item?.url === newsItem?.url);
    }
    
    return true;
  });

  return (
    <div className="dashboard-container">

      <Header />

      {/* Main Section: Display Tech News */}
      <main className="dashboard-main">
        <h2 className="dashboard-title">
          <FaNewspaper /> Latest Tech News
        </h2>

        {/* Filter Controls */}
        <div className="controls-container">
          <div className="filter-container">
            <button 
              className={`filter-btn ${selectedCategory === "all" ? "active" : ""}`}
              onClick={() => setSelectedCategory("all")}
            >
              All News
            </button>
            <button 
              className={`filter-btn ${selectedCategory === "bookmarked" ? "active" : ""}`}
              onClick={() => setSelectedCategory("bookmarked")}
            >
              <FaBookmark /> Bookmarked
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-text">Loading latest tech news...</div>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="news-list">
            {filteredNews.length > 0 ? (
              filteredNews.map((newsItem) => (
                <div 
                  className="news-card" 
                  key={newsItem.url}
                >
                  {newsItem.urlToImage && (
                    <div className="image-container">
                      <img 
                        src={newsItem.urlToImage} 
                        alt={newsItem.title} 
                        className="news-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/400x200?text=No+Image+Available";
                        }}
                      />
                      <div className="image-overlay">
                        <button 
                          className={`action-btn bookmark-btn ${bookmarkedNews.some(item => item.url === newsItem.url) ? "bookmarked" : ""}`}
                          onClick={() => toggleBookmark(newsItem)}
                          aria-label={bookmarkedNews.some(item => item.url === newsItem.url) ? "Remove bookmark" : "Bookmark"}
                          title={bookmarkedNews.some(item => item.url === newsItem.url) ? "Remove bookmark" : "Bookmark"}
                        >
                          <FaBookmark />
                        </button>
                        <button 
                          className="action-btn share-btn"
                          onClick={() => shareNews(newsItem)}
                          aria-label="Share"
                          title="Share"
                        >
                          <FaShareAlt />
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="news-content">
                    <h3>
                      <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
                        {newsItem.title}
                      </a>
                    </h3>
                    <p>{newsItem.description || "No description available."}</p>
                    <div className="news-meta">
                      <span>
                        <FaGlobe /> {newsItem.source?.name || "Unknown Source"}
                      </span>
                      <span>
                        <FaCalendarAlt /> {new Date(newsItem.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results-message">
                No news articles found.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default DeveloperDashboard;
