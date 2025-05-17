import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import axios from "axios";
// import BookPreviewModal from "./BookPreviewModal";
import { useNavigate } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";

const Main = (props) => {
  const [category, setCategory] = useState("programming");
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const booksPerPage = 25;

  const navigate = useNavigate()

  // Custom error and success message
  const showMessage = (message, type) => {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    messageDiv.style.position = "fixed";
    messageDiv.style.top = "10px";
    messageDiv.style.left = "50%";
    messageDiv.style.transform = "translateX(-50%)";
    messageDiv.style.padding = "10px 20px";
    messageDiv.style.borderRadius = "5px";
    messageDiv.style.zIndex = "9999";
    messageDiv.style.color = "#fff";
    messageDiv.style.fontWeight = "bold";
    if (type === "success") {
      messageDiv.style.backgroundColor = "green";
    } else {
      messageDiv.style.backgroundColor = "red";
    }
    document.body.appendChild(messageDiv);
    setTimeout(() => {
      messageDiv.remove();
    }, 6000);
  };

  const purchaseBook = async (bookId) => {
    const user = props.token;
    const id = user._id;

    try {
      setIsLoading(true)
      const res = await axios.post("https://pustak-point-backend.vercel.app/api/purchase", {
        bookId,
        id
      })

      // Custom success message
     showMessage(res.data.message, "success");
       setTimeout(()=>{
        window.location.reload()
      }, 1800)
      setIsLoading(false)
    } catch (err) {
      const errorMessage = err.response?.data || "Something went wrong";

      // Custom error message
      showMessage(errorMessage, "error");
      setIsLoading(false)
    }
  };

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const categoryToSend = category === "all" ? "All" : category;
      const response = await fetch(
        `https://pustak-point-backend.vercel.app/api/books?page=${currentPage}&limit=${booksPerPage}&category=${categoryToSend}&search=${searchTerm}`
      );
      const data = await response.json();
      if (data && data.books) {
        setBooks(data.books);
      } else {
        setBooks([]);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setIsLoading(false); // Stop loading if error occurs
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchBooks();
    window.scrollTo(0, 0);
    
    setIsLoading(false);
  }, [category, currentPage]); 
  // Pagination
  const nextPage = () => {
    if (books.length === booksPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle category change
  const handleCategoryChange = (newCategory) => {
    setIsLoading(true);
    setCategory(newCategory);
    setCurrentPage(1); // Reset to first page when category changes
    setIsLoading(false);
  };

  // Handle search button click
  const handleSearchClick = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (searchTerm === "") {
        showMessage("Search something!!", "error");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      const response = await fetch(
        `https://pustak-point-backend.vercel.app/api/books?page=${currentPage}&limit=${booksPerPage}&category=${searchTerm}&search=${searchTerm}`
      );
      const data = await response.json();
      setIsLoading(false);
      showMessage("Successfully searched!!", "success");
      setSearchTerm("");
      if (data && data.books) {
        setBooks(data.books);
      } else {
        setBooks([]); // No books found
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setIsLoading(false); // Stop loading if error occurs
    }

    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div
      style={{
        padding: "2rem",
        background: "#0f172a",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      {isLoading ? (
        <Loader /> // Use your Loader component here
      ) : (
        <>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
         <MDBBtn outline className='mx-2' color='info'
         style={{marginLeft: '80%', fontFamily: 'cursive', width: '190px', height: '40px'}}
               onClick={()=>{navigate("/profile")}}>
                view purchased books
      </MDBBtn>
      </div>
          <h1
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: "2rem",
              color: "#facc15",
            }}
          >
            📚 Books
          </h1>

          {/* Search bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              placeholder="Search books..."
              style={{
                padding: "0.8rem",
                borderRadius: "0.5rem",
                border: "1px solid #ddd",
                marginRight: "1rem",
                width: "100%",
                maxWidth: "500px",
              }}
            />
            <button
              onClick={handleSearchClick}
              style={{
                padding: "0.8rem 1.6rem",
                borderRadius: "0.5rem",
                backgroundColor: "#3b82f6",
                color: "#fff",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Search
            </button>
          </div>

          {/* Sticky Category Filter */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              top: 0,
              background: "#1e293b",
              padding: "1rem 0",
              zIndex: 10, // Ensures the buttons stay above other content
            }}
          >
            <button
              onClick={() => {
                handleCategoryChange("programming");
              }}
              style={category === "programming" ? activeButtonStyle : buttonStyle}
            >
              Computer/Tech
            </button>
            <button
              onClick={() => handleCategoryChange("Psychology")}
              style={category === "Psychology" ? activeButtonStyle : buttonStyle}
            >
              Psychology
            </button>
            <button
              onClick={() => handleCategoryChange("Finance")}
              style={category === "Finance" ? activeButtonStyle : buttonStyle}
            >
              Finance
            </button>
            <button
              onClick={() => handleCategoryChange("Business")}
              style={category === "Business" ? activeButtonStyle : buttonStyle}
            >
              Business
            </button>
            <button
              onClick={() => handleCategoryChange("success")}
              style={category === "success" ? activeButtonStyle : buttonStyle}
            >
              Success
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
            }}
          >
            {books.length > 0 ? (
              books.map((book) => (
                <div
                  key={book.id}
                  style={{
                    backgroundColor: "#1e293b",
                    borderRadius: "1rem",
                    padding: "1.2rem",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.03)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "0.75rem",
                      marginBottom: "1rem",
                    }}
                  />
                  <h2
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                      color: "#f8fafc",
                    }}
                  >
                    {book.title}
                  </h2>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "#cbd5e1",
                      textAlign: "center",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {book.description}
                  </p>
                  <div style={{ display: "flex", gap: "0.8rem" }}>
                    <button
                      style={{
                        padding: "0.6rem 1.2rem",
                        borderRadius: "0.5rem",
                        backgroundColor: "#87ceeb",
                        color: "#fff",
                        fontWeight: "600",
                        cursor: "pointer",
                        outline: "none",
                        border: "3px solid white",
                        color: "black",
                        fontWeight: "bold",
                      }}
                      aria-label="Purchase Book"
                      onClick={() => {
                        purchaseBook(book.id);
                      }}
                    >
                      🔒 Purchase (10 points)
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No books available.</p> // Handle case when no books are found
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "2rem",
              gap: "1rem",
            }}
          >
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              style={{
                padding: "0.6rem 1.2rem",
                borderRadius: "0.5rem",
                backgroundColor: currentPage === 1 ? "#94a3b8" : "#3b82f6",
                color: "#fff",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
              aria-label="Previous Page"
            >
              ◀ Prev
            </button>
            <button
              onClick={nextPage}
              disabled={books.length < booksPerPage}
              style={{
                padding: "0.6rem 1.2rem",
                borderRadius: "0.5rem",
                backgroundColor: books.length < booksPerPage ? "#94a3b8" : "#3b82f6",
                color: "#fff",
                cursor: books.length < booksPerPage ? "not-allowed" : "pointer",
              }}
              aria-label="Next Page"
            >
              Next ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const buttonStyle = {
  padding: "0.8rem 1.2rem",
  borderRadius: "0.5rem",
  backgroundColor: "#3b82f6",
  color: "#fff",
  fontWeight: "600",
  marginRight: "0.8rem",
  cursor: "pointer",
};

const activeButtonStyle = {
  ...buttonStyle,
  backgroundColor: "white", 
  color: "black",
  fontWeight: "bold"
};

export default Main;
