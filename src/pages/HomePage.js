import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/homepage/Navbar";
import Main from "../components/homepage/Main";
import Testimonials from "../components/homepage/Testimonials";
import Footer from "../components/homepage/Footer";
import StarBackground from "../components/homepage/StarBackground";
import "../assets/css/App.css";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        navigate("/signup");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [navigate]);

  return (
    <div className="home-page">
      <StarBackground />
      <div className="home-page-content">
        <Navbar />
        <Main />
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
