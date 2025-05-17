import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Header.config.css";
import { FaCoins } from "react-icons/fa";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Header = (props) => {
  const [token, setToken] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [navbarOpen, setNavbarOpen] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      navigate("/");
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    navigate("/profile");
    setShowDropdown(false);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleCategorySelect = (category) => {
    navigate(`/${category}`);
    setShowDropdown(false);
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-3 sticky-top w-100">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src={logo} alt="Logo" width="60" height="60" className="me-2" />
          <span className="fs-4 fw-bold">Pustak Point</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNavDropdown"
          aria-expanded={navbarOpen}
          aria-label="Toggle navigation"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          {navbarOpen ? (
            <span style={{ fontSize: "24px", fontWeight: "bold" }}>×</span> // X icon
          ) : (
            <span className="navbar-toggler-icon"></span>
          )}
        </button>

        <div
          className={`collapse navbar-collapse justify-content-end w-100 ${
            navbarOpen ? "show" : ""
          }`}
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav align-items-center gap-3">
            {/* Books Dropdown */}
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle fw-bold"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Books
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    style={{ backgroundColor: "#d6d6d6" }}
                    onClick={() => handleCategorySelect("all")}
                  >
                    ALL
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => handleCategorySelect("SE")}
                  >
                    SE
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    style={{ backgroundColor: "#d6d6d6" }}
                    onClick={() => handleCategorySelect("Finance")}
                  >
                    Finance
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => handleCategorySelect("Business")}
                  >
                    Business
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    style={{ backgroundColor: "#d6d6d6" }}
                    onClick={() => handleCategorySelect("Self-Improvement")}
                  >
                    Self-Improvement
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => handleCategorySelect("Computer Science")}
                  >
                    Computer Science
                  </a>
                </li>
              </ul>
            </li> */}

            {/* Features Dropdown */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle fw-bold"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={() => {
                  setShowDropdown(false);
                }}
              >
                Features
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    className="dropdown-item"
                    style={{ backgroundColor: "#d6d6d6" }}
                    to="/profile"
                    onClick={() => {
                      setShowDropdown(false);
                    }}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="/profile"
                    onClick={() => {
                      setShowDropdown(false);
                    }}
                  >
                    Reviews Page
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    style={{ backgroundColor: "#d6d6d6" }}
                    to="/profile"
                    onClick={() => {
                      setShowDropdown(false);
                    }}
                  >
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </li>

            {!token && (
              <li className="nav-item">
                <a href="/login" className="btn btn-outline-primary login-btn">
                  Login
                </a>
              </li>
            )}

            {token && (
              <>
                <li
                  className="nav-item d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                >
                  <FaCoins className="text-warning me-1" size={20} />
                  <span className="fw-semibold">{props.user?.points ?? 0}</span>
                </li>

                {/* Profile Icon with Dropdown */}
                <li className="nav-item position-relative" ref={dropdownRef}>
                  <img
                    src="https://th.bing.com/th/id/OIP.DtSNsWx_-jU3Aw2bplDzVQHaHa?rs=1&pid=ImgDetMain"
                    alt="Profile"
                    width="40"
                    height="40"
                    className="rounded-circle"
                    style={{ objectFit: "cover", cursor: "pointer" }}
                    onClick={() => setShowDropdown((prev) => !prev)}
                  />
                  {showDropdown && (
                    <div
                      className="dropdown-menu show"
                      style={{
                        position: "absolute",
                        top: "50px",
                        right: 0,
                        backgroundColor: "white",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                        padding: "10px",
                        zIndex: 1000,
                      }}
                    >
                      <button
                        className="dropdown-item"
                        onClick={handleProfileClick}
                        style={{
                          background: "none",
                          border: "none",
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        👤 Profile
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={handleLogoutClick}
                        style={{
                          background: "none",
                          border: "none",
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        🔓 Logout
                      </button>
                    </div>
                  )}
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
