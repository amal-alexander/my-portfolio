import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Icon } from "@iconify/react";
import { projectsData } from '../config';
import Lottie from 'lottie-react';
import keywordAnimation from '../lottie/keyword.json';
import contentAnimation from '../lottie/content.json';
import seoAnimation from '../lottie/seo.json';

const animations = {
  'keyword': keywordAnimation,
  'content': contentAnimation,
  'seo': seoAnimation
};

const Projects = () => {
  return (
    <section className="py-5" style={{ background: '#2d2d2d' }}>
      <Container>
        <h2 className="text-center mb-5" style={{ color: '#61dbfb' }}>Projects</h2>
        <div className="projects-slider">
          {projectsData.map(project => (
            <div 
              key={project.id} 
              className="mb-4"
              style={{
                background: '#383838',
                borderRadius: '15px',
                overflow: 'hidden',
                border: '1px solid rgba(97, 219, 251, 0.1)'
              }}
            >
              <Row className="g-0">
                <Col lg={5} className="d-flex align-items-center">
                  <div 
                    className="lottie-container" 
                    style={{ 
                      width: '100%',
                      height: '300px',
                      background: `
                        radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 20%),
                        radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 20%),
                        linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%),
                        linear-gradient(45deg, #2d2d2d 0%, #383838 100%)
                      `,
                      padding: '2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Main animation container */}
                    <div style={{
                      position: 'relative',
                      zIndex: 1,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 70%)',
                      borderRadius: '20px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                      backdropFilter: 'blur(5px)'
                    }}>
                      <Lottie 
                        animationData={animations[project.id]} 
                        loop={true}
                        style={{ 
                          width: '100%',
                          height: '100%',
                          maxWidth: '400px'
                        }}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg={7}>
                  <div 
                    className="content-container p-4 p-lg-5 d-flex flex-column"
                    style={{
                      height: '100%',
                      minHeight: '300px'
                    }}
                  >
                    <div>
                      <h3 
                        style={{ 
                          color: '#61dbfb',
                          fontSize: '2rem',
                          marginBottom: '1.5rem'
                        }}
                      >
                        {project.title}
                      </h3>
                      <p 
                        className="mb-4" 
                        style={{ 
                          color: '#e0e0e0',
                          fontSize: '1.1rem',
                          lineHeight: '1.7'
                        }}
                      >
                        {project.description}
                      </p>
                    </div>
                    <Button
                      variant="primary"
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto align-self-start"
                      style={{
                        background: '#61dbfb',
                        border: 'none',
                        padding: '0.75rem 2rem',
                        fontSize: '1.1rem'
                      }}
                    >
                      <Icon icon="material-symbols:rocket-launch" className="me-2" />
                      Try Now
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Projects;
