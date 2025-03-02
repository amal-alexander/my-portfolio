import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Card, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";

const StyledCard = styled(Card)`
  height: 100%;
  background: ${props => props.theme === 'dark' ? '#2d2d2d' : '#ffffff'};
  border: none;
  border-radius: 15px;
  overflow: hidden;

  .card-img-top {
    height: 200px;
    object-fit: cover;
  }

  .card-body {
    padding: 1.5rem;
  }

  .card-title {
    color: ${props => props.theme === 'dark' ? '#ffffff' : '#000000'};
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  .card-text {
    color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#666666'};
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }

  .button-group {
    display: flex;
    gap: 1rem;
    justify-content: flex-start;
  }
`;

const ProjectCard = ({ image, name, description, url, demo }) => {
  return (
    <StyledCard>
      <Card.Img variant="top" src={image} alt={name} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <div className="button-group">
          <Button
            variant="dark"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon="icomoon-free:github" /> Code
          </Button>
          {demo && (
            <Button
              variant="primary"
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon icon="material-symbols:rocket-launch" /> Live Demo
            </Button>
          )}
        </div>
      </Card.Body>
    </StyledCard>
  );
};

ProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  demo: PropTypes.string
};

ProjectCard.defaultProps = {
  demo: ""
};

export default ProjectCard;
