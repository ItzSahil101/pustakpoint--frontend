import React, { useState } from "react";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import "./Auth.config.css";
import Loader from "./Loader";
import { Link } from "react-router-dom";

function App() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [referralCode, setReferralCode] = useState();
  const [isFocused, setIsFocused] = useState(false);

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false); // New state for loader

  
const getDeviceFingerprint = async () => {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId; // This is the unique hash
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");
    setLoading(true);

    const deviceId = await getDeviceFingerprint();

    const data = {
      firstName: fName,
      lastName: lName,
      email,
      password: pass,
      referredBy: referralCode,
      deviceId,
    };

    try {
      const url = "https://pustak-point-backend.vercel.app/api/users";
      const { data: res } = await axios.post(url, data);
      setMsg(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  const baseStyle = {
    width: "250px",
    padding: "12px 20px",
    fontSize: "14px",
    color: "#333",
    backgroundColor: "#fff",
    border: "2px solid #ddd",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
    transition: "all 0.2s ease-in-out",
    outline: "none",
    margin: "10px",
    boxSizing: "border-box",
  };

  const focusStyle = {
    borderColor: "#0066FF",
    boxShadow: "0 4px 12px rgba(0,102,255,0.2)",
  };

  return (
    <MDBContainer
      fluid
      className="p-4 background-radial-gradient overflow-hidden"
    >
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <h1
            className="my-5 display-3 fw-bold ls-tight px-3"
            style={{ color: "hsl(218, 81%, 95%)" }}
          >
            The best Ebooks <br />
            <span style={{ color: "hsl(218, 81%, 75%)" }}>
              platform for learners
            </span>
          </h1>

          <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}>
            Pustak Point is a student-friendly platform where you can access
            ebooks, notes, and study materials using points. New users get 20
            free points, and each download costs just 10. Easily recharge via
            eSewa, explore resources by class or subject, and preview content
            before downloading. With features like referrals, daily login
            bonuses, and leaderboards, learning becomes fun and rewarding.
            Perfect for SEE, +2, and college students!
          </p>
        </MDBCol>

        <MDBCol md="6" className="position-relative">
          <div
            id="radius-shape-1"
            className="position-absolute rounded-circle shadow-5-strong"
          ></div>
          <div
            id="radius-shape-2"
            className="position-absolute shadow-5-strong"
          ></div>

          <MDBCard className="my-5 bg-glass">
            <MDBCardBody className="p-5">
              <form onSubmit={handleSubmit}>
                <MDBRow>
                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="First name"
                      id="form1"
                      type="text"
                      value={fName}
                      onChange={(e) => setFName(e.target.value)}
                      required
                    />
                  </MDBCol>

                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Last name"
                      id="form2"
                      type="text"
                      value={lName}
                      onChange={(e) => setLName(e.target.value)}
                      required
                    />
                  </MDBCol>
                </MDBRow>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  id="form3"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="form4"
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                />

                <input
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="Referral Code (Optional)"
                  style={{
                    ...baseStyle,
                    ...(isFocused ? focusStyle : {}),
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />

                {/* Error / Success Message */}
                {error && (
                  <div className="mb-3 text-danger text-center fw-bold">
                    {error}
                  </div>
                )}
                {msg && (
                  <div className="mb-3 text-success text-center fw-bold">
                    {msg}
                  </div>
                )}

                {/* Show the loader while loading */}
                {loading ? (
                  <Loader />
                ) : (
                  <MDBBtn
                    className="w-100 b-4"
                    size="md"
                    type="submit"
                    style={{
                      height: "45px",
                      transition: "none",
                      outline: "none",
                      boxShadow: "none",
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                    }}
                  >
                    Sign Up
                  </MDBBtn>
                )}
              </form>

              <div className="text-center">
                <p>
                  Already have an account?{" "}
                  <Link to="/log" style={{ color: "blue", fontWeight: "500" }}>
                    Login
                  </Link>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
