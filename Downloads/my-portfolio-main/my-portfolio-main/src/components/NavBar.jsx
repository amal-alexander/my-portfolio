import React from "react";
import styled from "styled-components";
// State
import { useSelector } from "react-redux";
import { selectMode } from "../app/appSlice";
import PropTypes from "prop-types";
// Router
import { Link, useLocation } from "react-router-dom";
// Images
import defaultLogo from "../images/defaultNavLogo.svg";
// Components
import { Link as ScrollLink } from "react-scroll";

import { Container, Nav as BootstrapNav, Navbar } from "react-bootstrap";

import ThemeToggle from "./ThemeToggle";

// #region constants
const navLinks = {
  routes: [
    { id: "1R", name: "Home", route: "/" },
    { id: "2R", name: "All Projects", route: "/All-Projects" },
  ],
  to: [
    { id: "1T", name: "Home", to: "Home" },
    { id: "2T", name: "About Me", to: "About" },
    { id: "3T", name: "Skills", to: "Skills" },
    { id: "4T", name: "Projects", to: "projects" },
    { id: "5T", name: "Contact", to: "Contact" },
  ],
};

// #region styled-components
const StyledDiv = styled.div`
  .navbar {
    border-bottom: var(--border);
    backdrop-filter: blur(10px);
    background: ${({ theme }) =>
      theme.name === "light"
        ? "rgba(248, 249, 250, 0.8)"
        : "rgba(33, 37, 41, 0.8)"} !important;
  }

  .spacer {
    height: var(--nav-height);
  }

  .logo-img {
    background: ${({ theme }) =>
      theme.name === "light" ? "var(--bs-dark)" : "var(--bs-light)"};
    transition: transform 0.3s ease;

    &:hover {
      transform: rotate(360deg);
    }
  }

  .nav-link {
    font-weight: 600;
    font-size: 1.1rem;
    position: relative;
    padding: 0.5rem 1rem !important;
    margin: 0 0.2rem;
    color: ${({ theme }) =>
      theme.name === "light" ? "var(--bs-dark)" : "var(--bs-light)"} !important;
    opacity: 0.85;
    transition: all 0.3s ease !important;

    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: 0;
      left: 50%;
      background-color: #61dbfb;
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }

    &:hover {
      opacity: 1;
      transform: translateY(-2px);
      
      &::after {
        width: 80%;
      }
    }

    &.active {
      opacity: 1;
      color: #61dbfb !important;
      
      &::after {
        width: 80%;
      }
    }
  }

  .navbar-toggler {
    border: none;
    padding: 0.5rem;
    transition: transform 0.3s ease;

    &:focus {
      box-shadow: none;
    }

    &:not(.collapsed) {
      transform: rotate(90deg);
    }
  }
`;

const propTypes = {
  Logo: PropTypes.node,
  callBack: PropTypes.func,
  closeDelay: PropTypes.number,
};

const NavBar = ({ Logo = defaultLogo, callBack, closeDelay = 125 }) => {
  const theme = useSelector(selectMode);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { pathname } = useLocation();

  return (
    <StyledDiv>
      <div className="spacer" />
      <Navbar
        id="nav"
        collapseOnSelect={true}
        expand="xl"
        expanded={isExpanded}
        bg={theme === "light" ? "light" : "dark"}
        variant={theme === "light" ? "light" : "dark"}
        fixed="top"
      >
        <Container>
          <Navbar.Brand>
            <img
              alt="Logo"
              src={Logo === null ? defaultLogo : Logo}
              width="35"
              height="35"
              className="rounded-circle logo-img"
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <BootstrapNav navbarScroll className="me-auto">
              {pathname === "/"
                ? navLinks.to.map((el) => (
                    <BootstrapNav.Item key={el.id}>
                      <ScrollLink
                        to={el.to}
                        spy={true}
                        activeClass="active"
                        className="nav-link"
                        onClick={() => {
                          setTimeout(() => {
                            setIsExpanded(false);
                          }, closeDelay);
                        }}
                      >
                        {el.name}
                      </ScrollLink>
                    </BootstrapNav.Item>
                  ))
                : navLinks.routes.map((el) => (
                    <BootstrapNav.Item key={el.id}>
                      <Link
                        to={el.route}
                        className={
                          pathname === el.route ? "nav-link active" : "nav-link"
                        }
                        onClick={() => {
                          setTimeout(() => {
                            setIsExpanded(false);
                          }, closeDelay);
                        }}
                      >
                        {el.name}
                      </Link>
                    </BootstrapNav.Item>
                  ))}
            </BootstrapNav>

            <BootstrapNav>
              <ThemeToggle
                closeDelay={closeDelay}
                setExpanded={setIsExpanded}
                setTheme={callBack}
              />
            </BootstrapNav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </StyledDiv>
  );
};

NavBar.propTypes = propTypes;

export default NavBar;
