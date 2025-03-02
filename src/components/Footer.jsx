import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledFooter = styled.footer`
  height: 50px;
  background: var(--bs-primary);
  padding: 0;
  display: flex;
  align-items: center;

  .footer-content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    color: ${({ $mode }) => $mode?.toLowerCase() === "light" ? "var(--bs-light)" : "var(--bs-gray-dark)"};
    font-size: 0.9rem;
    font-weight: 600;
  }

  .developer-credit {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
    
    .heart {
      color: #ff4d4d;
      animation: heartbeat 1.5s ease infinite;
    }

    @keyframes heartbeat {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
  }

  .copyright {
    opacity: 0.9;
    font-weight: 600;
  }

  a {
    color: ${({ $mode }) => $mode?.toLowerCase() === "light" ? "var(--bs-light)" : "var(--bs-gray-dark)"};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ $mode }) => $mode?.toLowerCase() === "light" ? "var(--bs-gray-dark)" : "var(--bs-light)"};
    }
  }

  @media (max-width: 768px) {
    height: auto;
    padding: 10px 0;
    
    .footer-content {
      flex-direction: column;
      gap: 0.5rem;
      font-size: 0.8rem;
    }
  }
`;

const propTypes = {
  mode: PropTypes.string.isRequired,
};

const Footer = ({ mode }) => {
  const currentYear = new Date().getFullYear();

  return (
    <StyledFooter $mode={mode}>
      <div className="footer-content">
        <div className="developer-credit">
          Developed by Amal Alexander <span className="heart">❤️</span>
        </div>
        <div className="copyright">
          {currentYear} All rights reserved
        </div>
      </div>
    </StyledFooter>
  );
};

Footer.propTypes = propTypes;

export default Footer;
