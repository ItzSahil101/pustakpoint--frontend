import React, { useState, useEffect } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBInputGroup,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import axios from "axios";
import Feedback from "./Feedback";
import Loader from "./Loader";
import { FaBook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Main(props) {
  const user = props.user;
  const userBookIds = user?.books || [];
  const [bookData, setBookData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [points, setPoints] = useState(10);
  const [loading, setLoading] = useState(false);
  const pricePerPoint = 1;
  const totalAmount = points * pricePerPoint;
  const [visibleCount, setVisibleCount] = useState(1);
  const [allusers, setAllUsers] = useState([]);

  const navigate = useNavigate();

  const sortedUsers = Array.isArray(allusers)
    ? [...allusers].sort((a, b) => b.books.length - a.books.length)
    : [];

  // Adjust visible count based on screen width
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width >= 1200) setVisibleCount(4);
      else if (width >= 992) setVisibleCount(3);
      else if (width >= 768) setVisibleCount(2);
      else setVisibleCount(1);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    getusersdata();
  
    const fetchBooks = async () => {
      if (!user || !user.books || user.books.length === 0) return;
  
      try {
        setLoading(true);
        const validBookIds = userBookIds.filter(Boolean);
        const requests = validBookIds.map((id) =>
          axios.get(`https://www.dbooks.org/api/book/${id}`)
        );
  
        const responses = await Promise.all(requests);
        const fetchedBooks = responses.map((response) => response.data);
        setBookData(fetchedBooks);
      } catch (error) {
        console.error("Error fetching book data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (userBookIds.length > 0) {
      fetchBooks();
    }
  }, [userBookIds]);
  

  const getusersdata = async () => {
    try {
      const response = await axios.get("https://pustak-point-backend.vercel.app/api/getusers");
      setAllUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

   const handlePurchase = async () => {
    if (points < 2) {
      alert("Minimum 2 points required");
      return;
    }
    navigate("/payment");
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        {loading && <Loader />}

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://th.bing.com/th/id/OIP.DtSNsWx_-jU3Aw2bplDzVQHaHa?rs=1&pid=ImgDetMain"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />
                <p className="text-muted mb-1">A Learner (user)</p>
                <p className="text-muted mb-4">
                  Gain knowledge by reading books!!
                </p>
                <div className="d-flex justify-content-center mb-2" style={{display: 'flex', marginTop: '4px', gap: '4px', flexDirection: 'column', alignItems: 'center'}}>
                  <MDBCard
                    outline
                    className="ms-1"
                    style={{
                      padding: "7px",
                      outline: "1px solid blue",
                      cursor: "pointer",
                      fontWeight: "700",
                      width: '100px'
                    }}
                  >
                    💰 : {user?.points ?? 0}
                  </MDBCard>
                  <MDBCard
                    outline
                    className="ms-1"
                    style={{
                      padding: "7px",
                      outline: "1px solid blue",
                      cursor: "pointer",
                      fontWeight: "700",
                       width: '150px'
                    }}
                  >
                   🤩 : {user?.referralCode ?? "null"}
                  </MDBCard>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4">
              <MDBCardBody>
                <h5 className="mb-3">💳 Purchase Points via eSewa</h5>
                <MDBInputGroup className="mb-3">
                  <MDBInput
                    type="number"
                    min="2"
                    step="10"
                    value={points}
                    onChange={(e) => setPoints(parseInt(e.target.value))}
                    label="Points (10 = ₹10)"
                  />
                </MDBInputGroup>
                <MDBCardText className="mb-2">
                  💰 Total Amount: <strong>₹{totalAmount}</strong>
                </MDBCardText>
                <MDBBtn
                  onClick={handlePurchase}
                  color="success"
                  style={{
                    height: "45px",
                    transition: "none",
                    outline: "none",
                    boxShadow: "none",
                    width: "80%",
                  }}
                >
                  Proceed to eSewa payment
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
            <MDBCard
              className="mb-4"
              style={{ height: "100%", maxHeight: "500px", overflow: "hidden" }}
            >
              <MDBCardBody>
                <h5 className="mb-3">🔥 Top Users</h5>
                <div
                  style={{
                    maxHeight: "410px",
                    overflowY: "auto",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                >
                  {sortedUsers.map((user) => (
                    <div
                      key={user._id}
                      style={{
                        background:
                          "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                        padding: "10px",
                        borderRadius: "6px",
                        marginBottom: "8px",
                        color: "#fff",
                        fontWeight: "600",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                        transition: "transform 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ marginRight: "10px" }}>
                          👨👤 {user.firstName} {user.lastName}
                        </span>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span>📕{user.books.length}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>First Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user?.firstName ?? "Guest"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Last Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user?.lastName ?? "User"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user?.email ?? "Not Provided"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBCardText className="mb-4">
                  <span
                    className="text-primary font-italic me-1"
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: "#3b82f6",
                      textShadow: "0 4px 6px rgba(0, 0, 0, 0.15)",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Downloaded🌠
                  </span>{" "}
                  <span
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: "#ef4444",
                      textShadow: "0 4px 6px rgba(0, 0, 0, 0.15)",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Resources🌟
                  </span>
                </MDBCardText>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "1.5rem",
                    minHeight: "300px",
                    alignItems: bookData.length === 0 ? "center" : "stretch",
                    justifyContent: bookData.length === 0 ? "center" : "start",
                  }}
                >
                  {bookData.length === 0 ? (
                    <div
                      style={{
                        gridColumn: "1 / -1",
                        textAlign: "center",
                        color: "#94a3b8",
                        fontSize: "1.1rem",
                        fontWeight: "500",
                        padding: "2rem",
                        backgroundColor: "#1e293b",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                      }}
                    >
                      🚫 You haven’t bought any books yet.
                    </div>
                  ) : (
                    (showAll ? bookData : bookData.slice(0, visibleCount)).map(
                      (book) => (
                        <div
                          key={book.id}
                          style={{
                            backgroundColor: "#0f172a",
                            borderRadius: "12px",
                            padding: "1rem",
                            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.25)",
                            transition: "all 0.3s ease-in-out",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            minHeight: "400px",
                            overflow: "hidden",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                              "translateY(-5px)";
                            e.currentTarget.style.boxShadow =
                              "0 8px 24px rgba(0, 0, 0, 0.4)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                              "0 4px 16px rgba(0, 0, 0, 0.25)";
                          }}
                        >
                          <img
                            src={book.image}
                            alt={book.title}
                            style={{
                              width: "100%",
                              height: "180px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              marginBottom: "0.75rem",
                            }}
                          />
                          <h2
                            style={{
                              fontSize: "1rem",
                              fontWeight: "600",
                              color: "#f1f5f9",
                              textAlign: "center",
                              marginBottom: "0.5rem",
                              minHeight: "48px",
                            }}
                          >
                            {book.title}
                          </h2>
                          <p
                            style={{
                              fontSize: "0.85rem",
                              color: "#cbd5e1",
                              textAlign: "center",
                              marginBottom: "1rem",
                              lineHeight: "1.3",
                              minHeight: "40px",
                            }}
                          >
                            {book.subtitle || "No description available"}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <a
                              href={book.download}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                padding: "0.5rem 1rem",
                                borderRadius: "8px",
                                backgroundColor: "#38bdf8",
                                color: "black",
                                fontWeight: "600",
                                textDecoration: "none",
                                border: "2px solid white",
                                transition: "all 0.2s ease",
                              }}
                              onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#7dd3fc")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "#38bdf8")
                              }
                            >
                              📖 Download Book
                            </a>
                          </div>
                        </div>
                      )
                    )
                  )}
                </div>

                {bookData.length > 1 && (
                  <div className="text-center mt-4">
                    <MDBBtn
                      size="sm"
                      color="info"
                      onClick={() => setShowAll(!showAll)}
                      style={{
                        height: "45px",
                        transition: "none",
                        outline: "none",
                        boxShadow: "none",
                        width: "90px",
                      }}
                    >
                      {showAll ? "Show Less" : "Show More"}
                    </MDBBtn>
                  </div>
                )}
              </MDBCardBody>
            </MDBCard>
            <Feedback
          name={user?.firstName ?? "Guest"}
          lname={user?.lastName ?? "Guest"}
          email={user?.email ?? "unknown"}
        />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
