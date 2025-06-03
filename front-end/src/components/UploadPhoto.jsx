import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UploadPhoto.css';
import seasonMstColors from '../data/season_mst_colors.json';

const loadingMessages = [
  'Uploading image',
  'Coaxing pixels through tubes',
  'Negotiating with firewalls',
  'First-class ticket to servers',
  'Waking face recognition hamsters',
  'Face or potato? Calibrating...',
  "Convincing cats they're faces",
  'Almost there',
];

const UploadPhoto = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [messageInterval, setMessageInterval] = useState(null);
  const transitionDuration = 3000;

  useEffect(() => {
    return () => {
      if (messageInterval) clearInterval(messageInterval);
    };
  }, [messageInterval]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setFile(file);
      setIsError(false);
      setErrorMessage('');
      const reader = new FileReader();
      reader.onload = (ev) => setImgSrc(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setFile(null);
      setImgSrc('');
      setIsError(true);
      setErrorMessage('Only PNG and JPG files are allowed.');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setFile(file);
      setIsError(false);
      setErrorMessage('');
      const reader = new FileReader();
      reader.onload = (ev) => setImgSrc(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setFile(null);
      setImgSrc('');
      setIsError(true);
      setErrorMessage('Only PNG and JPG files are allowed.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const clearImage = () => {
    setFile(null);
    setImgSrc('');
    setIsError(false);
    setErrorMessage('');
  };

  const updateMessage = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      setIsVisible(true);
    }, transitionDuration / 2);
  };

  function getSeasonByMst(mstLabel) {
    // mstLabel: e.g. 'mst_1', 'mst_2', ...
    const mstNum = parseInt(mstLabel.replace(/[^0-9]/g, ''));
    if ([1,2,3].includes(mstNum)) return 'Spring';
    if ([4,5,6].includes(mstNum)) return 'Autumn';
    if (mstNum === 7) return 'Summer';
    if ([8,9,10].includes(mstNum)) return 'Winter';
    return null;
  }

  const submitImage = async () => {
    if (!file) {
      setIsError(true);
      setErrorMessage('No image to submit');
      return;
    }
    document.getElementById('upload-image').scrollIntoView({ behavior: 'smooth' });
    setIsError(false);
    setIsUploading(true);
    setCurrentMessageIndex(0);
    const interval = setInterval(updateMessage, transitionDuration);
    setMessageInterval(interval);
    try {
      // Kirim ke backend Flask
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('https://dragf-ai-test-production.up.railway.app/predict', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }
      const data = await response.json();
      // Ambil musim dan warna dari JSON mapping
      const season = getSeasonByMst(data.skintone);
      const mapping = seasonMstColors[season];
      // Simpan hasil analysis ke localStorage
      if (imgSrc.startsWith('data:image/')) {
        const base64 = imgSrc.split(',')[1];
        localStorage.setItem('croppedImage', base64);
      }
      localStorage.setItem('analysis', JSON.stringify({
        season: season,
        mst: data.skintone,
        confidence: data.confidence,
        characteristics: `Your skin tone is ${data.skintone} (${season})`,
        colorsToSuggest: mapping.recommendedColors,
        reasonToSuggest: 'Recommended based on your season and MST.',
        colorsToAvoid: mapping.avoidColors,
        reasonToAvoid: 'Avoid these based on your season and MST.',
        content: 'This is a result from AI analysis.',
        textColor: '#e0a96d',
      }));
      setIsUploading(false);
      clearInterval(interval);
      setMessageInterval(null);
      navigate('/analysis');
    } catch {
      setIsError(true);
      setErrorMessage('Failed to process the image. Please try another photo or try again later.');
      setIsUploading(false);
      clearInterval(interval);
      setMessageInterval(null);
    }
  };

  return imgSrc ? (
    <div className="upload-preview-container" id="upload-image">
      <img
        src={imgSrc}
        alt="Preview"
        className={`upload-preview-img${isUploading ? ' opacity-50' : ''}`}
      />
      <div className="upload-preview-actions">
        <button className="upload-btn" onClick={submitImage} disabled={isUploading}>Submit</button>
        <button className="upload-btn outline" onClick={clearImage} disabled={isUploading}>Clear</button>
      </div>
      {(isError || isUploading) && (
        <div className={`upload-message${isError ? ' error' : ' uploading'}`}>
          {isError ? (
            errorMessage
          ) : (
            <div className="upload-message-loading">
              <span className="upload-dots">●●●</span>
              {isVisible && (
                <span className="upload-message-text">{loadingMessages[currentMessageIndex]}</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  ) : (
    <div
      role="none"
      id="upload-image"
      className="upload-dropzone-react"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      tabIndex={0}
      aria-label="Upload photo"
    >
      <span className="upload-icon-svg" aria-hidden="true">📤</span>
      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={fileInputRef}
        className="upload-input"
        onChange={handleFileChange}
        style={{ zIndex: 2, position: 'absolute', inset: 0, cursor: 'pointer' }}
      />
      <div className="upload-dropzone-text">
        <div>Click to upload a photo or drag and drop it here.</div>
        <small>Allowed formats: PNG and JPG.</small>
      </div>
      {isError && <div className="upload-message error">{errorMessage}</div>}
    </div>
  );
};

export default UploadPhoto;
