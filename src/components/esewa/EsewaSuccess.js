// src/pages/EsewaSuccess.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EsewaSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // extract query parameters
  const query = new URLSearchParams(location.search);
  const pid = query.get("pid");
  const uid = query.get("uid");
  const amt = query.get("amt");
  const refId = query.get("refId"); // will be present if verified

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axios.post("https://pustak-point-backend.vercel.app/api/esewa/verify", {
          pid,
          uid,
          amt,
        });

        if (res.data.success) {
          alert("Payment Verified! Points added 🎉");
          navigate("/profile"); // or wherever you want
        } else {
          alert("Payment verification failed");
        }
      } catch (err) {
        console.error("Verification error:", err);
        alert("Something went wrong");
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="container text-center mt-5">
      <h2>Verifying your payment...</h2>
    </div>
  );
};

export default EsewaSuccess;
