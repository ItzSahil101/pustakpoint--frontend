import React from "react";
import logo from '../images/logo.png';

const Footer = () => {
  return (
    <footer style={styles.footerSection}>
      <div style={styles.container}>
        <div style={styles.footerCta}>
          <div style={styles.row}>
            <div style={styles.col}>
              <div style={styles.singleCta}>
                <i className="fas fa-map-marker-alt" style={styles.icon}></i>
                <div style={styles.ctaText}>
                  <h4 style={styles.ctaTitle}>Find us</h4>
                  <span style={styles.ctaSpan}>Morang, Nepal</span>
                </div>
              </div>
            </div>
            <div style={styles.col}>
              <div style={styles.singleCta}>
                <i className="fas fa-phone" style={styles.icon}></i>
                <div style={styles.ctaText}>
                  <h4 style={styles.ctaTitle}>Call us</h4>
                  <span style={styles.ctaSpan}>9812398463</span>
                </div>
              </div>
            </div>
            <div style={styles.col}>
              <div style={styles.singleCta}>
                <i className="far fa-envelope-open" style={styles.icon}></i>
                <div style={styles.ctaText}>
                  <h4 style={styles.ctaTitle}>Mail us</h4>
                  <span style={styles.ctaSpan}>sahiljogi2066@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.footerContent}>
          <div style={styles.row}>
            <div style={styles.fullCol}>
              <div style={styles.footerWidget}>
                <div style={styles.footerLogo}>
                  <a href="/">
                    <img
                      src={logo}
                      alt="logo"
                      style={styles.logoImg}
                    />
                  </a>
                </div>
                <div style={styles.footerText}>
                  <p>
                  We are dedicated to providing high-quality resources, services, and support to empower individuals and businesses. Our mission is to make knowledge accessible, simplify solutions, and drive success through innovation and commitment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.copyrightArea}>
        <div style={styles.container}>
          <div style={styles.row}>
            <div style={styles.copyCol}>
              <div style={styles.copyrightText}>
                <p>
                  Copyright &copy; 2018, All right reserved {" "}
                  <a href="https://codepen.io/anupkumar92/" style={styles.link}>
                    Sahil
                  </a>
                </p>
              </div>
            </div>
            <div style={styles.footerMenuCol}>
              <div style={styles.footerMenu}>
                <ul style={styles.footerMenuList}>
                  <li><a href="/" style={styles.footerMenuLink}>Home</a></li>
                  <li><a href="#" style={styles.footerMenuLink}>Privacy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footerSection: {
    background: "#151414",
    position: "relative",
    paddingTop: "50px",
  },
  container: {
    width: "90%",
    margin: "0 auto",
  },
  footerCta: {
    borderBottom: "1px solid #373636",
    paddingBottom: "50px",
  },
  footerContent: {
    padding: "50px 0",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  col: {
    flex: "1",
    minWidth: "250px",
    marginBottom: "30px",
  },
  fullCol: {
    width: "100%",
    textAlign: "center",
  },
  singleCta: {
    display: "flex",
    alignItems: "flex-start",
  },
  icon: {
    color: "#ff5e14",
    fontSize: "30px",
    marginRight: "15px",
  },
  ctaText: {
    display: "inline-block",
  },
  ctaTitle: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "2px",
  },
  ctaSpan: {
    color: "#757575",
    fontSize: "15px",
  },
  footerWidget: {},
  footerLogo: {
    marginBottom: "30px",
  },
  logoImg: {
    maxWidth: "200px",
    borderRadius: "50%"
  },
  footerText: {
    color: "#7e7e7e",
    fontSize: "14px",
    lineHeight: "28px",
  },
  copyrightArea: {
    background: "#202020",
    padding: "25px 0",
    marginTop: "50px",
  },
  copyrightText: {
    fontSize: "14px",
    color: "#878787",
  },
  link: {
    color: "#ff5e14",
    textDecoration: "none",
  },
  copyCol: {
    flex: "1",
    textAlign: "center",
  },
  footerMenuCol: {
    flex: "1",
    display: "flex",
    justifyContent: "center",
  },
  footerMenu: {},
  footerMenuList: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    gap: "20px",
    margin: 0,
  },
  footerMenuLink: {
    color: "#878787",
    fontSize: "14px",
    textDecoration: "none",
  },
};

export default Footer;
