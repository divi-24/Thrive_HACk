import React from "react";
import "../../assets/css/Main.css";
import { Link } from "react-router-dom";
import { FaUsers, FaBriefcase, FaRocket, FaShieldAlt, FaChartLine, FaCogs, 
         FaMobile, FaClock, FaSearch, FaBullseye, FaTasks } from 'react-icons/fa';

const Main = () => {
  const features = [
    {
      icon: <FaUsers />,
      title: "Developer Network",
      description: "Connect with talented developers worldwide. Build your professional network and collaborate on exciting projects."
    },
    {
      icon: <FaBriefcase />,
      title: "Smart Job Matching",
      description: "Our AI-powered system matches you with jobs that perfectly align with your skills and preferences."
    },
    {
      icon: <FaRocket />,
      title: "Career Growth",
      description: "Access resources, mentorship opportunities, and skill development tools to accelerate your career."
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Platform",
      description: "Your data is protected with enterprise-grade security. We ensure safe and reliable connections."
    },
    {
      icon: <FaChartLine />,
      title: "Real-time Analytics",
      description: "Track your application status, profile views, and engagement metrics in real-time."
    },
    {
      icon: <FaCogs />,
      title: "Customization",
      description: "Tailor your experience with customizable preferences, job alerts, and recommendation settings."
    }
  ];

  const simplificationFeatures = [
    {
      icon: <FaMobile />,
      title: "Flexibility",
      description: "Mobile-first convenience. Quick and easy to shortlist jobs."
    },
    {
      icon: <FaClock />,
      title: "Time Savings",
      description: "Personalized job recommendations. Effortless navigation."
    },
    {
      icon: <FaSearch />,
      title: "Transparent Information",
      description: "Insights into job requirements while maintaining anonymity."
    },
    {
      icon: <FaBullseye />,
      title: "Accurate Matching",
      description: "Higher matching accuracy. Improved hiring rates."
    },
    {
      icon: <FaTasks />,
      title: "Simplified Workflow",
      description: "Streamlined pre-selection process. Organized tracking."
    }
  ];

  return (
    <>
      <section className="hero">
        <h1>Where Talent Meets Opportunity</h1>
        <p>
          Thrive connects developers and companies seamlessly, ensuring
          skill-based matchmaking for job opportunities and collaborations.
        </p>
        <div className="buttons">
          <Link to="/signup">
            <button className="btn-company">Find The Right Match</button>
          </Link>
        </div>
      </section>

      <section className="features-section">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="simplify-section">
        <div className="simplify-content">
          <h2>How Thrive Simplifies Your Job Search</h2>
          <p className="simplify-subtitle">Job hunting can often be a long and stressful journey. But with Thrive, finding the perfect opportunity becomes effortless!</p>
          
          <div className="simplify-grid">
            {simplificationFeatures.map((feature, index) => (
              <div className="simplify-card" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="simplify-icon">
                  {feature.icon}
                </div>
                <div className="simplify-text">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
     