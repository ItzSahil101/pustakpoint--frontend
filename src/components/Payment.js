import React, { useEffect, useState } from 'react';
import esewaQR from '../images/eSewa_My_QR_9842174208_1748493683843_2025-05-29_10_26_24.jpg';

const Payment = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dynamicStyles = {
    contentWrapper: {
      ...styles.contentWrapper,
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: isMobile ? 'center' : 'space-around',
      alignItems: isMobile ? 'center' : 'flex-start',
    },
    leftSide: {
      ...styles.leftSide,
      flex: 1,
    },
    rightSide: {
      ...styles.rightSide,
      flex: 1,
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>💸 Pay Money At This QR</h1>

      <div style={dynamicStyles.contentWrapper}>
        {/* Left Side */}
        <div style={dynamicStyles.leftSide}>
          <img src={esewaQR} alt="eSewa QR" style={styles.qrImage} />

          <div style={styles.phoneBox}>
            <label style={styles.label}>eSewa Number:</label>
            <input
              type="text"
              value="9842174208"
              readOnly
              style={styles.input}
            />
          </div>
        </div>

        {/* Right Side */}
        <div style={dynamicStyles.rightSide}>
          <h2 style={styles.guidanceHeading}>📌 Guidance to Pay</h2>
          <ul style={styles.stepsList}>
            <li><strong>1.</strong> Per Point = <strong>Rs. 1</strong></li>
            <li><strong>2.</strong> Send money to the QR above or eSewa number: <strong>9842174208</strong></li>
            <li><strong>3.</strong> Send amount based on points. (e.g., Rs. 20 = 20 Points)</li>
            <li style={styles.highlight}>
              <strong>4.</strong> While paying, in the <u>remark section</u>, <strong>enter your email</strong> used in your Pustak Point account.
            </li>
            <li><strong>5.</strong> After payment, just relax 😎 — we’ll automatically verify and credit your points.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: 'rgb(15, 23, 42)',
    color: '#fff',
    padding: '40px 20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    fontSize: '2.4rem',
    marginBottom: '40px',
    textAlign: 'center',
    color: '#38bdf8',
    letterSpacing: '1px',
    fontFamily: 'WDXL Lubrifont TC',
  },
  contentWrapper: {
    display: 'flex',
    gap: '40px',
  },
  leftSide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  rightSide: {
    maxWidth: '600px',
    textAlign: 'left',
  },
  qrImage: {
    width: '100%',
    maxWidth: '320px',
    borderRadius: '20px',
    boxShadow: '0 0 25px rgba(56, 189, 248, 0.4)',
    marginBottom: '20px',
  },
  phoneBox: {
    width: '100%',
    maxWidth: '400px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    fontSize: '1.1rem',
    color: '#94a3b8',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    fontSize: '1.1rem',
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    border: '2px solid #38bdf8',
    borderRadius: '10px',
    pointerEvents: 'none',
  },
  guidanceHeading: {
    fontSize: '1.8rem',
    color: '#facc15',
    marginBottom: '16px',
  },
  stepsList: {
    listStyle: 'none',
    padding: 0,
    lineHeight: '1.8',
    fontSize: '1.05rem',
  },
  highlight: {
    color: '#f87171',
    fontWeight: '600',
  },
};

export default Payment;
