import React from 'react';

const BookCard = ({ book, onPreviewClick }) => {
  return (
    <div 
      style={{
        backgroundColor: '#1e293b',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      <img
        src={book.cover}
        alt={book.title}
        style={{
          width: '100%',
          height: '300px',
          objectFit: 'cover',
          borderRadius: '0.75rem',
          marginBottom: '1rem',
        }}
      />
      <h3
        style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          marginBottom: '0.5rem',
          color: '#f8fafc',
          textAlign: 'center',
        }}
      >
        {book.title}
      </h3>
      <p
        style={{
          fontSize: '1rem',
          color: '#cbd5e1',
          textAlign: 'center',
          marginBottom: '1.2rem',
        }}
      >
        {book.description}
      </p>

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={() => onPreviewClick(book)}
          style={{
            padding: '0.8rem 1.6rem',
            backgroundColor: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '0.5rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.3s',
          }}
          onMouseEnter={e => e.target.style.backgroundColor = '#2563eb'}
          onMouseLeave={e => e.target.style.backgroundColor = '#3b82f6'}
          onMouseDown={e => e.target.style.transform = 'scale(0.98)'}
          onMouseUp={e => e.target.style.transform = 'scale(1)'}
        >
          👁 Preview
        </button>

        <button
          onMouseEnter={e => e.target.style.backgroundColor = '#475569'}
          onMouseLeave={e => e.target.style.backgroundColor = '#64748b'}
          onMouseDown={e => e.target.style.transform = 'scale(0.98)'}
          onMouseUp={e => e.target.style.transform = 'scale(1)'}
        >
          ⬇ Download
        </button>
      </div>
    </div>
  );
};

export default BookCard;
