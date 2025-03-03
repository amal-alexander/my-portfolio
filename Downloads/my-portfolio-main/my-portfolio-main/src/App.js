import React from "react";
// Styles
import { ThemeProvider } from "styled-components";
// State
import { useDispatch, useSelector } from "react-redux";
import { selectMode, setMode } from "./app/appSlice";
import { setProjects, setMainProjects } from "./app/projectsSlice";
import { useGetUsersQuery, useGetProjectsQuery } from "./app/apiSlice";
import PropTypes from "prop-types";
// Router
import { HashRouter, Routes, Route } from "react-router-dom";
// Pages
import Home from "./pages/Home";
import AllProjects from "./pages/AllProjects";
import NotFound from "./pages/NotFound";



// Components
import { ErrorBoundary } from "react-error-boundary";
import AppFallback from "./components/AppFallback";
import GlobalStyles from "./components/GlobalStyles";
import ScrollToTop from "./components/ScrollToTop";
import Loading from "./components/Loading";
import { Element } from "react-scroll";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
// Config
import { footerTheme, navLogo } from "./config";
// Util
import { getStoredTheme, getPreferredTheme, setTheme } from "./utils";

// Flying Icons Component
import FlyingIcons from "./FlyingIcons";

const propTypes = {
  filteredProjects: PropTypes.arrayOf(PropTypes.string),
  projectCardImages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.any.isRequired,
      isStreamlit: PropTypes.bool,
      demoUrl: PropTypes.string
    })
  ),
};

const App = ({ projectCardImages = [], filteredProjects = [] }) => {
  const theme = useSelector(selectMode);
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, error } = useGetUsersQuery();
  const { data: projectsData } = useGetProjectsQuery();

  // Set projects state and main projects in a single effect
  React.useEffect(() => {
    if (projectsData?.length) {
      const tempData = projectsData.map(element => ({
        id: element.id,
        homepage: element.homepage,
        description: element.description,
        name: element.name,
        html_url: element.html_url,
        image: null,
        isStreamlit: false,
        demoUrl: null
      }));

      // Add image and demo data
      if (projectCardImages?.length) {
        projectCardImages.forEach(cardImage => {
          const project = tempData.find(
            proj => proj.name.toLowerCase() === cardImage.name.toLowerCase()
          );
          if (project) {
            project.image = cardImage.image;
            project.isStreamlit = cardImage.isStreamlit || false;
            project.demoUrl = cardImage.demoUrl || null;
          }
        });
      }

      dispatch(setProjects(tempData));

      // Set main projects
      const mainProjects = filteredProjects?.length
        ? tempData.filter(obj => filteredProjects.includes(obj.name))
        : tempData.slice(0, 3);
      
      dispatch(setMainProjects(mainProjects));
    }
  }, [projectsData, projectCardImages, filteredProjects, dispatch]);

  // Theme setup
  React.useEffect(() => {
    const storedTheme = getStoredTheme();
    const themeToSet = storedTheme || getPreferredTheme();
    dispatch(setMode(themeToSet));
    setTheme(themeToSet);

    // Theme listener
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== "light" && storedTheme !== "dark") {
        const newTheme = getPreferredTheme();
        dispatch(setMode(newTheme));
        setTheme(newTheme);
      }
    };

    mediaQuery.addEventListener("change", handleThemeChange);
    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, [dispatch]);

  let content;
  if (isLoading) {
    content = (
      <Container className="d-flex vh-100 align-items-center">
        <Loading />
      </Container>
    );
  } else if (isSuccess) {
    content = (
      <>
        <Element name={"Home"} id="home">
          <NavBar 
            Logo={navLogo} 
            callBack={(newTheme) => {
              dispatch(setMode(newTheme));
              setTheme(newTheme);
            }} 
          />
        </Element>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/All-Projects" element={<AllProjects />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer mode={footerTheme} />
      </>
    );
  } else if (isError) {
    content = (
      <Container className="d-flex vh-100 align-items-center justify-content-center">
        <h2>
          {error.status !== "FETCH_ERROR"
            ? `${error.status}: ${error.data.message} - check githubUsername in src/config.js`
            : `${error.status} - check URLs in src/app/apiSlice.js`}
        </h2>
      </Container>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={AppFallback}>
      <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ThemeProvider theme={{ name: theme }}>
          <ScrollToTop />
          <GlobalStyles />
          <FlyingIcons />
          {content}
        </ThemeProvider>
      </HashRouter>
    </ErrorBoundary>
  );
};

App.propTypes = propTypes;

export default App;
