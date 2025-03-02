import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Element } from "react-scroll";
import { Col, Container, Row } from "react-bootstrap";
import Title from "./Title";

// #region styled-components
const StyledAboutMe = styled.section`
  padding: 2rem;
  background-color: ${props => props.theme.name === 'dark' ? '#1a1a1a' : '#f8f9fa'};
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 2rem 0;

  p {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }

  .profile-section {
    margin-bottom: 2rem;
  }

  .github-stats {
    margin-top: 2rem;
    display: flex;
    gap: 2rem;
    justify-content: center;
    flex-wrap: wrap;

    img {
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      opacity: 0;
      transform: translateY(20px);
      animation: fadeInUp 0.6s ease forwards;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      }
    }

    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    img:nth-child(2) {
      animation-delay: 0.2s;
    }

    img:nth-child(3) {
      animation-delay: 0.4s;
    }

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      
      img {
        width: 100%;
        max-width: 450px;
      }
    }
  }

  .social-links {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
    flex-wrap: wrap;

    a {
      padding: 0.5rem 1.5rem;
      border-radius: 25px;
      background-color: ${props => props.theme.name === 'dark' ? '#2d2d2d' : '#e9ecef'};
      color: ${props => props.theme.name === 'dark' ? '#fff' : '#000'};
      text-decoration: none;
      transition: all 0.3s ease;

      &:hover {
        background-color: #0d6efd;
        color: white;
        transform: translateY(-2px);
      }
    }
  }

  .avatar-container {
    @media (max-width: 768px) {
      margin-bottom: 2rem;
    }

    img {
      background-color: ${props => props.theme.name === 'dark' ? '#2d2d2d' : '#ffffff'};
      opacity: 1 !important;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      border: 3px solid #0d6efd;
      border-radius: 50%;
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      @media (max-width: 768px) {
        width: 12rem !important;
        height: 12rem !important;
        animation: none !important;
        transform: none !important;
      }

      &:hover {
        transform: scale(1.02);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
      }
    }
  }
`;
// #endregion

const propTypes = {
  avatar_url: PropTypes.string.isRequired,
  bio: PropTypes.string,
  moreInfo: PropTypes.string,
};

const AboutMe = ({ avatar_url, bio, moreInfo }) => {
  return (
    <Element name={"About"} id="about">
      <Container>
        <StyledAboutMe className="section">
          <Container className="d-flex justify-content-center mb-4">
            <Title size={"h2"} text={"About Me"} />
          </Container>
          
          <Row className="profile-section">
            <Col md={4} className="avatar-container text-center">
              <img
                src={avatar_url}
                alt="GitHub Avatar"
                loading="lazy"
                style={{ width: "15rem", height: "15rem", objectFit: "cover" }}
              />
            </Col>
            <Col md={8}>
              <div className="bio-container">
                <p>I started my journey in SEO, helping websites grow with better rankings and more traffic. Over time, I explored technical SEO, optimizing site structures and fixing complex issues. This led me to coding, where I built solutions that made SEO and web development more efficient.</p>
                <p>With 4 years of experience, I now blend SEO, web development, and problem-solving to create unique digital strategies. I love making the impossible possible—whether it's ranking tough keywords or building smart web solutions that drive business growth! 🚀</p>
                {moreInfo && <p>{moreInfo}</p>}
              </div>
            </Col>
          </Row>

          <div className="github-stats">
            <img 
              src="https://camo.githubusercontent.com/8e75f9292fee8884617503fa0a88a2bde6611cc78bbc7eeb43f212b247f1e9fd/68747470733a2f2f6769746875622d726561646d652d73747265616b2d73746174732e6865726f6b756170702e636f6d2f3f757365723d616d616c2d616c6578616e646572267468656d653d6461726b26686964655f626f726465723d74727565"
              alt="GitHub Streak Stats"
            />
            <img 
              src="https://camo.githubusercontent.com/c7f381577ccdadfc13d79c4e9e6381c3d8e33e20920d57099ca27f280d0127c8/68747470733a2f2f6769746875622d726561646d652d73746174732e76657263656c2e6170702f6170692f746f702d6c616e67732f3f757365726e616d653d616d616c2d616c6578616e646572267468656d653d6461726b26686964655f626f726465723d7472756526696e636c7564655f616c6c5f636f6d6d6974733d7472756526636f756e745f707269766174653d74727565266c61796f75743d636f6d70616374"
              alt="Top Languages"
            />
            <img 
              src="https://camo.githubusercontent.com/22f51949bb951dd370ccb426d3ac7406fcd0772898ee64d7e0434c053a8c2c62/68747470733a2f2f6769746875622d636f6e7472696275746f722d73746174732e76657263656c2e6170702f6170693f757365726e616d653d616d616c2d616c6578616e646572266c696d69743d35267468656d653d6461726b26636f6d62696e655f616c6c5f796561726c795f636f6e747269627574696f6e733d74727565"
              alt="GitHub Contributor Stats"
            />
          </div>

          <div className="social-links">
            <a href="https://github.com/amal-alexander" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://linkedin.com/in/amal-alexander" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </StyledAboutMe>
      </Container>
    </Element>
  );
};

AboutMe.propTypes = propTypes;

export default AboutMe;
