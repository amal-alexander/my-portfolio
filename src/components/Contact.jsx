import React from "react";
import styled from "styled-components";
import { Element } from "react-scroll";
import Title from "./Title";
import { Container } from "react-bootstrap";
import ContactForm from "./ContactForm";
import Lottie from "lottie-react";

// Import JSON animations
import gmailAnimation from "../images/gmail.json";
import instagramAnimation from "../images/instagram.json";
import linkedinAnimation from "../images/linkedin.json";
import youtubeAnimation from "../images/youtube.json";

const StyledSection = styled.section`
  min-height: auto;
  padding: 2rem 0 4rem;
`;

const SectionTitle = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 4rem;
  align-items: flex-start;
  justify-content: center;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 1px;
    background: var(--bs-primary);
    opacity: 0.3;
  }

  @media (max-width: 991px) {
    flex-direction: column;
    gap: 3rem;

    &:before {
      display: none;
    }
  }
`;

const Column = styled.div`
  flex: 1;
  max-width: 500px;
  width: 100%;
`;

const SocialSection = styled.div`
  .section-title {
    margin-bottom: 2rem;
    text-align: center;
  }

  .social-grid {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: nowrap;
    
    @media (max-width: 768px) {
      gap: 1.5rem;
      flex-wrap: wrap;
    }
  }

  .social-item {
    width: 70px;
    height: 70px;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }

    @media (max-width: 768px) {
      width: 60px;
      height: 60px;
    }
  }
`;

const socialLinks = [
  {
    animation: gmailAnimation,
    url: "mailto:your.email@gmail.com",
    alt: "Email"
  },
  {
    animation: linkedinAnimation,
    url: "https://linkedin.com/in/your-linkedin",
    alt: "LinkedIn"
  },
  {
    animation: instagramAnimation,
    url: "https://instagram.com/your-instagram",
    alt: "Instagram"
  },
  {
    animation: youtubeAnimation,
    url: "https://youtube.com/your-channel",
    alt: "YouTube"
  }
];

const Contact = () => {
  return (
    <Element name={"Contact"} id="contact">
      <StyledSection>
        <Container>
          <SectionTitle>
            <Title size={"h2"} text={"Contact"} />
          </SectionTitle>
          <ContentWrapper>
            <Column>
              <ContactForm />
            </Column>
            <Column>
              <SocialSection>
                <div className="section-title">
                  <Title size={"h2"} text={"Follow Me"} />
                </div>
                <div className="social-grid">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.alt}
                    >
                      <div className="social-item">
                        <Lottie
                          animationData={social.animation}
                          loop={true}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                    </a>
                  ))}
                </div>
              </SocialSection>
            </Column>
          </ContentWrapper>
        </Container>
      </StyledSection>
    </Element>
  );
};

export default Contact;
