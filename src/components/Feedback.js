import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaCommentDots } from 'react-icons/fa';

const Feedback = (props) => {
  const [formData, setFormData] = useState({
    name: props.name,
    email: props.email,
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://pustak-point-backend.vercel.app/api/feedback/postf', formData);
      setSubmitted(true);
      setFormData({
        name: props.name,
        email: props.email,
        message: '',
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="feedback-container">
      <h2>We Value Your Feedback ✨</h2>
      <p>Tell us your suggestions, complaints, or anything you want us to improve!</p>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="input-group">
          <FaUser className="input-icon" />
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            value={props.name}
            readOnly
          />
        </div>
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            value={props.email}
            readOnly
          />
        </div>
        <div className="input-group">
          <FaCommentDots className="input-icon" />
          <textarea 
            name="message" 
            placeholder="Your Message..." 
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required 
          ></textarea>
        </div>
        <button type="submit" className="submit-btn">Submit Feedback</button>
      </form>
      {submitted && (
        <div className="thank-you-message">
          <h3>Thank you for your feedback! 💬</h3>
        </div>
      )}

      <style>{`
        .feedback-container {
          max-width: 600px;
          margin: 3rem auto;
          padding: 2rem;
          background: #ffffff;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          border-radius: 12px;
          text-align: center;
          font-family: 'Poppins', sans-serif;
          background-image: linear-gradient(to top left, #e0eafc, #cfdef3);
        }

        .feedback-container h2 {
          margin-bottom: 0.5rem;
          font-size: 2rem;
          color: #333;
        }

        .feedback-container p {
          margin-bottom: 2rem;
          color: #555;
          font-size: 1rem;
        }

        .feedback-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .input-group {
          position: relative;
        }

        .input-group input,
        .input-group textarea {
          width: 100%;
          padding: 0.75rem 2.5rem 0.75rem 3rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          transition: 0.3s ease;
        }

        .input-group input:focus,
        .input-group textarea:focus {
          border-color: #4a90e2;
          outline: none;
          box-shadow: 0 0 5px rgba(74,144,226,0.5);
        }

        .input-icon {
          position: absolute;
          top: 50%;
          left: 1rem;
          transform: translateY(-50%);
          color: #777;
          font-size: 1.2rem;
        }

        .submit-btn {
          padding: 0.75rem;
          background: #4a90e2;
          color: white;
          font-size: 1.1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .submit-btn:hover {
          background: #357ABD;
        }

        .thank-you-message {
          margin-top: 2rem;
          background: #d4edda;
          color: #155724;
          padding: 1rem;
          border-radius: 8px;
          animation: fadeIn 0.8s ease forwards;
        }

        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(-10px);}
          to {opacity: 1; transform: translateY(0);}
        }

        @media (max-width: 600px) {
          .feedback-container {
            margin: 2rem 1rem;
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Feedback;
