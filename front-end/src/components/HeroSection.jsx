import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeroSection.css';
import UploadPhoto from './UploadPhoto';

const HeroSection = () => {
  // Fungsi untuk smooth scroll ke UploadPhoto
  const handleGetStarted = () => {
    const uploadSection = document.getElementById('upload-image');
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero-container">
      <header className="navbar">
        <a href="/" className="logo mobile-only"><span>Color Tone</span></a>
        <nav className="nav-desktop">
          <a href="/" className="logo desktop-only"><span>Color Tone</span></a>
          <div className="nav-link-custom"><Link to="/about">About</Link></div>
          <div className="nav-link-custom"><Link to="/contact">Contact</Link></div>
          <div className="nav-link-custom"><Link to="/support">Support</Link></div>
        </nav>
        <div className="mode-toggle">☀️</div>
      </header>

      <main className="hero-content">
        <h2>Unlock Your Personal Color Skin Tone with</h2>
        <h1 className="highlight">Color <em>Tone</em></h1>
        <p>
          Discover the perfect colors that complement your skin tone and style. 
          And, finally find harmony in your wardrobe.
        </p>
        <div className="hero-buttons">
          <button>Learn More →</button>
          <button onClick={handleGetStarted}>Get Started →</button>
        </div>
        <UploadPhoto />
      </main>
    </div>
  );
};

export default HeroSection;
