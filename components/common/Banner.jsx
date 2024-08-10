import React from 'react';
import styled from 'styled-components';
import { FaGamepad } from 'react-icons/fa';
import Typewriter from 'react-typewriter-effect';
import { Link } from 'react-router-dom';
import banner_image from '../../assets/images/banner_image.mp4';

const Banner = () => {
  return (
    <BannerWrapper className='d-flex align-items-center justify-content-start'>
      <video className="banner-video" autoPlay loop muted playsInline>
        <source src={banner_image} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className='banner-content w-100 container text-white'>
        <h1
          className='banner-title text-uppercase'
          style={{
            color: 'white',
            fontSize: '58px',
            textShadow: `
              0 0 5px rgba(255, 255, 255, 0.5),
              0 0 10px rgba(255, 255, 255, 0.5),
              0 0 20px rgba(255, 255, 255, 0.5),
              0 0 30px rgba(255, 255, 255, 0.5),
              0 0 40px rgba(255, 255, 255, 0.5),
              0 0 55px rgba(255, 255, 255, 0.5),
              0 0 75px rgba(255, 255, 255, 0.5)
            `,
          }}
        >
          best online games to play
        </h1>
        <div className='lead-text'>
          <Typewriter
            textStyle={{
              color: '#fff',
              fontWeight: 500,
              fontSize: '1.3em',
            }}
            startDelay={2000}
            cursorColor="#fff"
            multiText={[
              'Welcome to NEBULA Games!',
              'Discover a world of fun and inclusive games for everyone.',
              'Whether you\'re into action, puzzles, or just want to have a good time, we\'ve got you covered.',
              'Play, enjoy, and explore with NEBULA Games!'
            ]}
            multiTextDelay={1000}
            typeSpeed={50}
            multiTextLoop
          />
        </div>
        <Link to="/creators">
          <button type="button" className='banner-btn d-flex align-items-center'>
            <span className='btn-icon'>
              <FaGamepad className='text-white' size={25} />
            </span>
            <span className='btn-text text-white'>play now</span>
          </button>
        </Link>
      </div>
    </BannerWrapper>
  );
};

export default Banner;

const BannerWrapper = styled.div`
  position: relative;
  min-height: 768px;
  overflow: hidden;

  .banner-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }

  .banner-content {
    z-index: 1;
    padding: 0 20px;
    max-width: 800px;

    

    .lead-text {
      background: rgba(0, 0, 0, 0.6); /* Darker semi-transparent background */
      backdrop-filter: blur(12px); /* Stronger blur effect */
      border-radius: 12px; /* Slightly rounded corners */
      border: 1px solid rgba(255, 255, 255, 0.3); /* Subtle border */
      padding: 30px; /* Increased padding */
      color: #e0e0e0; /* Lighter text color */
      font-size: 1.6rem;
      margin: 20px auto; /* Centered with automatic horizontal margins */
      max-width: 700px; /* Slightly larger maximum width */
    }


    .banner-btn {
      min-width: 160px;
      height: 50px;
      padding: 15px 20px;
      font-size: 18px;
      font-weight: 700;
      text-transform: uppercase;
      border: 2px solid #8e2de2; /* Changed border color to a lighter purple */
      background-color: #8e2de2; /* Changed background color to a lighter purple */
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 30px;
      transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
      
      .btn-icon {
        margin-right: 12px;
      }

      .btn-text {
        font-weight: 600;
      }

      &:hover {
        background-color: #7a1e9c; /* Darker purple for hover effect */
        border: 2px solid #7a1e9c; /* Darker purple border on hover */
        transform: scale(1.05);
      }
    }
  }

  @media screen and (max-width: 768px) {
    .banner-title {
      font-size: 2.5rem; /* Smaller font size on mobile */
    }

    .lead-text {
      font-size: 1.0rem; /* Smaller font size on mobile */
      padding: 20px;
      max-width: 90%;
    }

    .banner-btn {
      font-size: 16px; /* Adjusted button font size */
      padding: 12px 18px;
      min-width: 120px;
      height: 40px;
    }
  }
`;