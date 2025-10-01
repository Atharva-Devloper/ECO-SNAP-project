import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>EcoSnap</h3>
            <p>Making waste management smarter and more efficient through community engagement.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Features</h4>
            <ul>
              <li><Link to="/citizen-features">For Citizens</Link></li>
              <li><Link to="/organization-features">For Organizations</Link></li>
              <li><Link to="/municipal-solutions">Municipal Solutions</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 EcoSnap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
