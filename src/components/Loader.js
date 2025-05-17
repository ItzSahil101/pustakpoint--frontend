import React from 'react';

const Loader = () => {
  const loaderOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100%',
    background: 'rgba(255, 255, 255, 0.5)', // semi-transparent background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  };

  const dotContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60px', // container size for 3 dots
  };

  const dotStyle = {
    width: '12px', // dot size
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#00e0ff', // dot color
    animation: 'bounce 1.4s infinite ease-in-out',
  };

  const dot1Style = { ...dotStyle, animationDelay: '0s' };
  const dot2Style = { ...dotStyle, animationDelay: '0.2s' };
  const dot3Style = { ...dotStyle, animationDelay: '0.4s' };

  return (
    <>
      <div style={loaderOverlayStyle}>
        <div style={dotContainerStyle}>
          <div style={dot1Style}></div>
          <div style={dot2Style}></div>
          <div style={dot3Style}></div>
        </div>
      </div>

      {/* Keyframe animation for bouncing dots */}
      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </>
  );
};

export default Loader;
