import React, { useEffect, useState } from "react";
import axios from "axios";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

GlobalWorkerOptions.workerSrc = pdfjsWorker;

const BookPreviewModal = ({ bookId, onClose }) => {
  const [bookData, setBookData] = useState(null);
  const [pageText, setPageText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const res = await axios.get(
          `https://www.dbooks.org/api/book/${bookId}`
        );
        setBookData(res.data);
        await extractFirstPageText(res.data.download);
      } catch (err) {
        console.error("Error fetching book data:", err);
        setError("Failed to load book preview.");
        setLoading(false);
      }
    };

    const extractFirstPageText = async (pdfUrl) => {
      try {
        const loadingTask = getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        const textContent = await page.getTextContent();

        const text = textContent.items.map((item) => item.str).join(" ");
        setPageText(text);
      } catch (err) {
        console.error("PDF parsing error:", err);
        setError("Failed to load PDF content.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [bookId]);

  if (loading) {
    return (
      <div style={styles.backdrop}>
        <div style={styles.modalContent}>
          <p style={styles.loading}>⏳ Loading preview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.backdrop}>
        <div style={styles.modalContent}>
          <button
            style={styles.closeBtn}
            onClick={onClose}
            aria-label="Close preview"
          >
            ✕
          </button>
          <p style={{ color: "red", fontSize: "16px" }}>{error}</p>
        </div>
      </div>
    );
  }

  if (!bookData) return null;

  return (
    <div style={styles.backdrop}>
      <div style={styles.modalContent}>
        <button
          style={styles.closeBtn}
          onClick={onClose}
          aria-label="Close preview"
        >
          ✕
        </button>

        <div style={styles.topSection}>
          <h2 style={styles.heading}>First Page Preview</h2>
          <p style={styles.text}>
            {pageText ||
              "No readable text found on the first page of this PDF."}
          </p>
        </div>

        <div style={styles.bottomSection}>
          <h3 style={styles.subheading}>{bookData.title}</h3>
          <p>
            <strong>Author:</strong> {bookData.authors}
          </p>
          <p>
            <strong>Year:</strong> {bookData.year}
          </p>
          <p>
            <strong>Pages:</strong> {bookData.pages}
          </p>
          <a
            href={bookData.download}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.downloadBtn}
          >
            📥 Download Full Book
          </a>
        </div>
      </div>
    </div>
  );
};

const styles = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modalContent: {
    width: "80%",
    height: "90%",
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
    overflowY: "auto",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "15px",
    fontSize: "24px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },
  topSection: {
    flex: 7,
    overflowY: "auto",
    padding: "10px",
    borderBottom: "1px solid #ccc",
  },
  bottomSection: {
    flex: 3,
    padding: "10px",
  },
  heading: {
    fontSize: "20px",
    marginBottom: "10px",
  },
  subheading: {
    fontSize: "18px",
    marginBottom: "8px",
  },
  text: {
    fontSize: "16px",
    lineHeight: "1.4",
    whiteSpace: "pre-wrap",
  },
  loading: {
    fontSize: "18px",
    textAlign: "center",
  },
  downloadBtn: {
    marginTop: "10px",
    display: "inline-block",
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 15px",
    borderRadius: "5px",
    textDecoration: "none",
  },
};

export default BookPreviewModal;
