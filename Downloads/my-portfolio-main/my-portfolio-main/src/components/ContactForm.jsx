import React from "react";
// Styles
import styled from "styled-components";
// State
import { useSelector } from "react-redux";
import { selectMode } from "../app/appSlice";
// Components
import { Alert, Button, Form, Spinner } from "react-bootstrap";
// Config
import { formspreeUrl } from "../config";
// Util
import { postData } from "../utils";

// #region styled-components
const StyledForm = styled.div`
  .form-control {
    background: ${({ theme }) =>
      theme.name === "light"
        ? "rgba(var(--bs-body-color-rgb), 0.03)"
        : "var(--bs-gray-dark)"};
    border: 2px solid ${({ theme }) =>
      theme.name === "light"
        ? "rgba(0, 0, 0, 0.1)"
        : "rgba(255, 255, 255, 0.1)"};
    transition: all 0.3s ease;

    &:focus {
      background: ${({ theme }) =>
        theme.name === "light"
          ? "rgba(var(--bs-body-color-rgb), 0.05)"
          : "var(--bs-gray-dark)"};
      border-color: #61dbfb;
      box-shadow: 0 0 0 0.25rem rgba(97, 219, 251, 0.25);
    }
  }

  .form-label {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: ${({ theme }) =>
      theme.name === "light"
        ? "var(--bs-dark)"
        : "var(--bs-light)"};
  }

  textarea.form-control {
    min-height: 120px;
    resize: vertical;
  }

  .btn {
    position: relative;
    overflow: hidden;
    border-width: 2px;
    font-weight: 600;
    padding: 0.75rem 2rem;
    transition: all 0.3s ease;
    background: ${({ theme }) =>
      theme.name === "light"
        ? "transparent"
        : "rgba(255, 255, 255, 0.05)"};
    border-color: ${({ theme }) =>
      theme.name === "light"
        ? "var(--bs-dark)"
        : "var(--bs-light)"};

    &:hover {
      transform: translateY(-2px);
      background: #61dbfb;
      border-color: #61dbfb;
      color: ${({ theme }) =>
        theme.name === "light"
          ? "var(--bs-light)"
          : "var(--bs-dark)"};
    }

    &:active {
      transform: translateY(0);
    }
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .invalid-feedback h5 {
    font-size: 0.875rem;
    margin: 0.25rem 0 0;
    color: var(--bs-danger);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 15px;
    background: ${({ theme }) =>
      theme.name === "light"
        ? "rgba(255, 255, 255, 0.8)"
        : "rgba(0, 0, 0, 0.2)"};
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid ${({ theme }) =>
      theme.name === "light"
        ? "rgba(0, 0, 0, 0.1)"
        : "rgba(255, 255, 255, 0.1)"};
  }
`;
// #endregion

// #region component
const ContactForm = () => {
  const [isValidated, setIsValidated] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [danger, setDanger] = React.useState(false);
  const [dangerMessage, setDangerMessage] = React.useState(null);
  const theme = useSelector(selectMode);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    setSuccess(false);
    setDanger(false);
    setDangerMessage(null);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setIsValidated(true);
    const { name, email, message } = form.elements;
    const data = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    if (form.checkValidity()) {
      event.preventDefault();
      event.persist();
      setIsProcessing(true);
      try {
        const response = await postData(formspreeUrl, data);
        if (!response.ok) {
          throw new Error(`${response.status}: check formspreeUrl in data.js`);
        }
        setIsProcessing(false);
        setIsValidated(false);
        event.target.reset();
        setSuccess(true);
      } catch (error) {
        setIsProcessing(false);
        setIsValidated(false);
        event.target.reset();
        setDangerMessage(error.message);
        setDanger(true);
      }
    }
  };

  return (
    <StyledForm>
      <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
        <Form.Group className="mx-auto mb-3 form-group" controlId="name">
          <Form.Label className="form-label">Name</Form.Label>
          <Form.Control required type="text" placeholder="Your name" />
          <Form.Control.Feedback type="invalid">
            <h5>Name must be at least one character.</h5>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mx-auto mb-3 form-group" controlId="email">
          <Form.Label className="form-label">Email address</Form.Label>
          <Form.Control
            required
            pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
            placeholder="someone@something.com"
          />
          <Form.Control.Feedback type="invalid">
            <h5>Please enter a valid email.</h5>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mx-auto mb-3 form-group" controlId="message">
          <Form.Label className="form-label">Message</Form.Label>
          <Form.Control required as="textarea" placeholder="Your message..." />
          <Form.Control.Feedback type="invalid">
            <h5>Please provide a valid message.</h5>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mx-auto text-center form-group">
          {formspreeUrl && (
            <Button
              size="lg"
              variant={theme === "light" ? "outline-dark" : "outline-light"}
              type="submit"
              disabled={isProcessing}
              className="btn my-4"
            >
              Submit{" "}
              {isProcessing && (
                <Spinner animation="border" variant="success" size="sm" />
              )}
            </Button>
          )}
          <Alert
            show={success}
            variant="success"
            onClose={() => setSuccess(false)}
            dismissible
          >
            <Alert.Heading>Success! I will contact you soon.</Alert.Heading>
          </Alert>
          <Alert
            show={danger}
            variant="danger"
            onClose={() => setDanger(false)}
            dismissible
          >
            <Alert.Heading>{dangerMessage}</Alert.Heading>
          </Alert>
          <Alert show={!formspreeUrl} variant="danger">
            <Alert.Heading>
              You must provide a valid formspree url in src/config.js
            </Alert.Heading>
          </Alert>
        </Form.Group>
      </Form>
    </StyledForm>
  );
};
// #endregion

export default ContactForm;
