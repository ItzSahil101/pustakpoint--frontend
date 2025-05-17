import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.config.css";
import { Link } from "react-router-dom";

// Loader Component
const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for login
  const [loadingModal, setLoadingModal] = useState(false); // Loading state for modal

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.type === "email" ? "email" : "password"]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const url = "https://pustak-point-backend.vercel.app/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      navigate("/");
      window.location.reload();
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const ForgotPasswordModal = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleSubmit = (e) => {
      e.preventDefault();
      handleForgotPasswordSubmit(email);
    };

    const handleForgotPasswordSubmit = async (email) => {
      setLoadingModal(true); // Show loader on modal form submission
      try {
        const response = await axios.post("http://localhost:7000/api/auth/forgot-password", { email });
        if (response.status === 200) {
          alert("Password reset link sent to your email!");
          setShowModal(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setError(error.response.data.message);
        }
      } finally {
        setLoadingModal(false); // Hide loader after request
      }
    };

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
          <h4>Forgot Password</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "10px",
                marginBottom: "20px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            {loadingModal ? (
              <Loader /> // Show loader in the modal
            ) : (
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "blue",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  float: "right",
                }}
              >
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Modal Overlay */}
      {showModal && <ForgotPasswordModal onClose={() => setShowModal(false)} />}

      {/* Login Form */}
      <MDBContainer fluid className="p-4 background-radial-gradient">
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
          </MDBCol>

          <MDBCol md="6">
            <MDBCard className="my-5 bg-glass">
              <MDBCardBody className="p-5">
                <form onSubmit={handleSubmit}>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email"
                    type="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    type="password"
                    value={data.password}
                    onChange={handleChange}
                    required
                  />
                  {error && <p style={{ color: "red" }}>{error}</p>}

                  {loading ? (
                    <Loader /> // Show loader when submitting
                  ) : (
                    <MDBBtn className="w-100 mb-4" size="md" type="submit"
                    style={{
                      height: "45px",
                      transition: "none",
                      outline: "none",
                      boxShadow: "none",
                    }}>
                      Login
                    </MDBBtn>
                  )}
                </form>

                <div className="text-center">
                  <p>
                    Don’t have an account?{" "}
                    <Link
                      to="/login"
                      style={{ color: "blue", fontWeight: "500" }}
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
                <p className="text-center">
                  <button
                    onClick={() => setShowModal(true)}
                    style={{
                      background: "none",
                      border: "1px solid black",
                      color: "blue",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    Forgot Password?
                  </button>
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default Login;
