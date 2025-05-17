import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "./Loader";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        `https://pustak-point-backend.vercel.app/api/auth/forgot-password/reset-password/${token}`,
        { newPassword }
      );
      console.log("Sending new password to backend:", newPassword);
      setMessage(response.data.message);
      setError("");

      // Redirect to login after 1 second
      setTimeout(() => {
        navigate("/login");
        window.location.reload(); // Reload page to reset any auth state
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setMessage("");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#111827",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  };

  const formStyle = {
    backgroundColor: "#1F2937",
    padding: "30px",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #374151",
    backgroundColor: "#374151",
    color: "#fff",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#10B981",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: "20px", fontSize: "24px" }}>Reset Your Password</h2>
      <form style={formStyle} onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          style={inputStyle}
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
        {message && <p style={{ color: "lightgreen", marginBottom: "10px" }}>{message}</p>}
        
        {/* Show loader while submitting */}
        {loading ? (
          <Loader />
        ) : (
          <button type="submit" style={buttonStyle}>
            Update Password
          </button>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
