import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeroSection.css';

const Support = () => (
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
      <h2>Support</h2>
      <h1 className="highlight">How Can We Help?</h1>
      <p>Need help? Visit our support resources or contact our team for assistance. We are ready to support you!</p>
    </main>
  </div>
);

export default Support;
