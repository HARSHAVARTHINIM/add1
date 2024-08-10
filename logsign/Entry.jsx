import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Plx from 'react-plx';
import './entry.css';

const Entry = () => {
  const [showHomeButton, setShowHomeButton] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setShowHomeButton(scrollY > 100); 
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="entryBody">
      <Plx
        parallaxData={[
          {
            start: 0,
            end: 1600, 
            easing: 'ease-in',
            properties: [
              {
                startValue: 1,
                endValue: 1.6,
                property: 'scale',
              },
            ],
          },
        ]}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '100%',
          zIndex: 100,
        }}
      >
        <img style={{ width: '100%' }} src="bg.png" alt="foreground" />
      </Plx>

      <Plx
        parallaxData={[
          {
            start: 0,
            end: 1600,
            properties: [
              {
                startValue: 1,
                endValue: 1.18,
                property: 'scale',
              },
            ],
          },
        ]}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '100%',
        }}
      >
        <img style={{ width: '100%' }} src="background.jpg" alt="background" />
      </Plx>

      <Plx
        parallaxData={[
          {
            start: 0,
            end: 400,
            properties: [
              {
                startValue: 1,
                endValue: 0,
                property: 'opacity',
              },
            ],
          },
        ]}
        style={{
          position: 'fixed',
          left: 0,
          top: '26vw',
          width: '100%',
        }}
      >
        <img style={{ width: '30vw' }} src="/text-img.webp" alt="Goonies" />
      </Plx>

      <div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 200,
          paddingTop: '56%',
          height: '400vh',
          width: '100%',
        }}
      >
        <div
          style={{
            background: '#000',
            height: '100%',
          }}
        ></div>
      </div>

      {showHomeButton && (
        <Link to="/home">
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="home-button"
  >
    Home
  </button>
</Link>

      )}
    </div>
  );
};

export default Entry;
