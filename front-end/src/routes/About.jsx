import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeroSection.css';

const About = () => (
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
      <h2>About Us</h2>
      <h1 className="highlight">Our Mission</h1>
      <p>Welcome to our About page! Learn more about our mission and team here. Kami berkomitmen membantu Anda menemukan warna terbaik untuk gaya dan kepercayaan diri Anda.</p>
    </main>
  </div>
);

export default About;
