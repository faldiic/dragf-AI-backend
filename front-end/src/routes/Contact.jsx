import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeroSection.css';

const Contact = () => (
  <div className="hero-container">
    <header className="navbar">
      <Link to="/" className="logo mobile-only"><span>Color Tone</span></Link>
      <nav className="nav-desktop">
        <Link to="/" className="logo desktop-only"><span>Color Tone</span></Link>
        <div className="nav-link-custom"><Link to="/about">About</Link></div>
        <div className="nav-link-custom"><Link to="/contact">Contact</Link></div>
        <div className="nav-link-custom"><Link to="/support">Support</Link></div>
      </nav>
      <div className="mode-toggle">☀️</div>
    </header>
    <main className="hero-content">
      <h2>Contact Us</h2>
      <h1 className="highlight">Get in Touch</h1>
      <p>Have questions? Reach out to us via email or our contact form. We are here to help you!</p>
    </main>
  </div>
);

export default Contact;
