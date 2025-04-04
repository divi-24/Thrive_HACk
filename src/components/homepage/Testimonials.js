import React from "react";
import "../../assets/css/Testimonials.css";
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  { 
    text: "Thrive made my job search super easy!",
    name: "John Doe",
    role: "Full Stack Developer"
  },
  { 
    text: "I found my dream job within days of using Thrive.",
    name: "Jane Smith",
    role: "UI/UX Designer"
  },
  { 
    text: "The swipe feature is so convenient and effective.",
    name: "Alex Johnson",
    role: "Software Engineer"
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="testimonials-content">
      <h2>User Testimonials</h2>
        <p className="testimonials-subtitle">
          Hear what our users have to say about their experience with Thrive
        </p>
        
      <div className="testimonial-cards">
        {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="quote-icon">
                <FaQuoteLeft />
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <h4>{testimonial.name}</h4>
                <p>{testimonial.role}</p>
              </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
