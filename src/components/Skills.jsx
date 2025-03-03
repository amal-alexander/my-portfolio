import React, { useEffect, useRef, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectMode } from "../app/appSlice";
import { Element } from "react-scroll";
import { Button, Col, Container, Row } from "react-bootstrap";
import Title from "./Title";
import { skillData, resume } from "../config";
import AOS from 'aos';
import 'aos/dist/aos.css';
import styled from 'styled-components';

// Import all tech images
import htmlIcon from "../images/html-icon.svg";
import cssIcon from "../images/css-icon.svg";
import jsIcon from "../images/js-icon.svg";
import reactIcon from "../images/react-icon.svg";
import nodeIcon from "../images/node-icon.svg";
import mysqlIcon from "../images/mysql-icon.svg";
import bootstrapIcon from "../images/bootstrap-icon.svg";
import wordpressIcon from "../images/wordpress.svg";
import vsCodeIcon from "../images/vscode-icon.svg";
import shopifyIcon from "../images/shopify.svg";

// Python icon URL (colored version)
const pythonIcon = "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg";

const StyledSkillsSection = styled.section`
  position: relative;
  padding: 4rem 0;
  background-color: ${props => props.theme.name === 'dark' ? '#1a1a1a' : '#f8f9fa'};
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 2rem 0;
  overflow: hidden;

  .react-bg-icon {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
    opacity: 0.1;
    pointer-events: none;
    z-index: 0;
    animation: spin 20s linear infinite;
    display: none;

    @media (max-width: 768px) {
      display: block;
    }
  }

  &:hover .react-bg-icon {
    display: none;
  }

  @keyframes spin {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  .content {
    position: relative;
    z-index: 1;
  }
`;

const Skills = () => {
  const theme = useSelector(selectMode);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  const techIcons = useMemo(() => [
    htmlIcon, cssIcon, jsIcon, reactIcon, nodeIcon,
    mysqlIcon, bootstrapIcon, wordpressIcon, vsCodeIcon, 
    shopifyIcon, pythonIcon
  ], []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => {
      if (skillsSection) {
        observer.unobserve(skillsSection);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];

    const createParticle = () => {
      const iconImg = new Image();
      iconImg.src = techIcons[Math.floor(Math.random() * techIcons.length)];
      
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 40 + Math.random() * 30, // Increased size
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: (Math.random() - 0.5) * 1.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        icon: iconImg,
        opacity: 0.15 + Math.random() * 0.2
      };
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 25; i++) { // Increased number of particles
        particles.push(createParticle());
      }
      particlesRef.current = particles;
    };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.translate(particle.x + particle.size / 2, particle.y + particle.size / 2);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.drawImage(
          particle.icon,
          -particle.size / 2,
          -particle.size / 2,
          particle.size,
          particle.size
        );
        ctx.restore();

        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;

        if (particle.x <= 0 || particle.x >= canvas.width - particle.size) {
          particle.speedX *= -1;
        }
        if (particle.y <= 0 || particle.y >= canvas.height - particle.size) {
          particle.speedY *= -1;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [techIcons]);

  return (
    <Element name={"Skills"} id="skills">
      <Container>
        <StyledSkillsSection className="section">
          {!isInView && (
            <img 
              src={reactIcon} 
              alt="" 
              className="react-bg-icon"
            />
          )}
          <div className="canvas-container" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 1
          }}>
            <canvas
              ref={canvasRef}
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
          </div>
          
          <div className="content">
            <Container className="text-center">
              <Container className="d-flex justify-content-center" data-aos="fade-down">
                <Title size={"h2"} text={"Skills"} />
              </Container>
              <Row className="mt-3 align-items-center">
                {skillData.map((skills, index) => {
                  return (
                    <Col xs={4} key={skills.id} className="my-md-5" 
                      data-aos="zoom-in"
                      data-aos-delay={index * 100}>
                      <figure style={{
                        margin: '1.5rem 0',
                        transform: 'scale(1.2)', // Make icons bigger
                      }}>
                        {skills.skill}
                        <figcaption style={{
                          marginTop: '0.5rem',
                          fontWeight: '500'
                        }}>{skills.name}</figcaption>
                      </figure>
                    </Col>
                  );
                })}
              </Row>
              {resume && (
                <a href={resume} data-aos="fade-up">
                  <Button
                    size="lg"
                    variant={theme === "light" ? "outline-dark" : "outline-light"}
                    className="mt-5"
                  >
                    R&eacute;sum&eacute;
                  </Button>
                </a>
              )}
            </Container>
          </div>
        </StyledSkillsSection>
      </Container>
    </Element>
  );
};

export default Skills;
