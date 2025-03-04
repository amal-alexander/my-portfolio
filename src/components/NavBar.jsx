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
import { Container, Nav, Navbar } from "react-bootstrap";
import ThemeToggle from "./ThemeToggle";

// Navigation Links
const navLinks = {
  routes: [
    { id: "1R", name: "Home", route: "/" },
    { id: "2R", name: "All Projects", route: "/All-Projects" },
  ],
  to: [
    { id: "1T", name: "Home", to: "Home" },
    { id: "2T", name: "About Me", to: "About" },
    { id: "3T", name: "Skills", to: "Skills" },
    { id: "4T", name: "Projects", to: "Projects" }, // Fixed Scroll ID
    { id: "5T", name: "Contact", to: "Contact" },
  ],
};

// Styled Components
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
    transition: transform 0.3s ease;
    &:hover {
      transform: rotate(360deg);
    }
  }

  .nav-link {
    font-weight: 600;
    font-size: 1.1rem;
    padding: 0.5rem 1rem !important;
    margin: 0 0.2rem;
    color: ${({ theme }) =>
      theme.name === "light" ? "var(--bs-dark)" : "var(--bs-light)"} !important;
    transition: all 0.3s ease !important;

    &:hover {
      opacity: 1;
      transform: translateY(-2px);
    }

    &.active {
      color: #61dbfb !important;
    }
  }
`;

const NavBar = ({ Logo = defaultLogo, callBack, closeDelay = 125 }) => {
  const theme = useSelector(selectMode);
  const [isExpanded, setisExpanded] = React.useState(false);
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
              src={Logo || defaultLogo}
              width="35"
              height="35"
              className="rounded-circle logo-img"
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => setisExpanded(!isExpanded)}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {pathname === "/"
                ? navLinks.to.map((el) => (
                    <Nav.Item key={el.id}>
                      <ScrollLink
                        to={el.to}
                        spy={true}
                        smooth={true}
                        duration={500}
                        offset={-80} // Adjust for navbar height
                        activeClass="active"
                        className="nav-link"
                        onClick={() => {
                          setTimeout(() => setisExpanded(false), closeDelay);
                        }}
                      >
                        {el.name}
                      </ScrollLink>
                    </Nav.Item>
                  ))
                : navLinks.routes.map((el) => (
                    <Nav.Item key={el.id}>
                      <Link
                        to={el.route}
                        className={
                          pathname === el.route ? "nav-link active" : "nav-link"
                        }
                        onClick={() => {
                          setTimeout(() => setisExpanded(false), closeDelay);
                        }}
                      >
                        {el.name}
                      </Link>
                    </Nav.Item>
                  ))}
              <Nav.Item>
                <Link to="/blog" className="nav-link">
                  Blog
                </Link>
              </Nav.Item>
            </Nav>

            <Nav>
              <ThemeToggle
                closeDelay={closeDelay}
                setExpanded={setisExpanded}
                setTheme={callBack}
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </StyledDiv>
  );
};

NavBar.propTypes = {
  Logo: PropTypes.node,
  callBack: PropTypes.func,
  closeDelay: PropTypes.number,
};

export default NavBar;