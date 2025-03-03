// Skills icons - https://icon-sets.iconify.design/
import React from 'react';
import { Icon } from "@iconify/react";

// Navbar Logo image (add your image to the src/images directory and uncomment the line below to import your image)
// import newLogo from "./images/yourFileName"

// Hero Images (add your images to the /images directory with the same names)
import HeroLight from "./images/hero-light.jpg";
import HeroDark from "./images/hero-dark.jpg";

// Projects Images (add your images to the images directory and import below)
import Logo from "./images/logo.svg";

/* START HERE
 **************************************************************
  Add your GitHub username (string - "YourUsername") below.
*/
export const githubUsername = "amal-alexander";

// Navbar Logo image
export const navLogo = null;

/* Main
 ************************************************************** 
  Add a custom blog icon or update the hero images for the Main section.
*/
export const Blog = null;

// Hero images
export { HeroLight as Light };
export { HeroDark as Dark };

/* About Me
 ************************************************************** 
  Add a second paragraph for the about me section.
*/
export const moreInfo =
  "I enjoy learning about technology and helping others use it to improve their lives and be more productive. I built this site with React, React Bootstrap, Redux, and the GitHub REST API.";

/* Skills
 ************************************************************** 
  Add or remove skills in the SAME format below, choose icons here - https://icon-sets.iconify.design/
*/
export const skillData = [
  {
    id: 1,
    skill: <Icon icon="mdi:language-html5" className="display-4" />,
    name: "HTML5",
  },
  {
    id: 2,
    skill: <Icon icon="ion:logo-css3" className="display-4" />,
    name: "CSS3",
  },
  {
    id: 3,
    skill: <Icon icon="fa6-brands:js" className="display-4" />,
    name: "JavaScript",
  },
  {
    id: 4,
    skill: <Icon icon="ri:bootstrap-fill" className="display-4" />,
    name: "BootStrap",
  },
  {
    id: 5,
    skill: <Icon icon="mdi:react" className="display-4" />,
    name: "React",
  },
  {
    id: 6,
    skill: <Icon icon="file-icons:styledcomponents" className="display-4" />,
    name: "Styled Components",
  },
  {
    id: 7,
    skill: <Icon icon="akar-icons:redux-fill" className="display-4" />,
    name: "Redux",
  },
  {
    id: 8,
    skill: <Icon icon="bi:git" className="display-4" />,
    name: "Git",
  },
  {
    id: 9,
    skill: <Icon icon="fa6-brands:square-github" className="display-4" />,
    name: "GitHub",
  },
];

// Resume link
export const resume = null;

/* Projects
 ************************************************************** 
  Project configurations with Lottie animations
*/
export const filteredProjects = ["keyword", "content", "seo"];

export const projectsData = [
  {
    id: "keyword",
    title: "Keyword Analysis Tool",
    description: "AI-powered tool for keyword research and analysis",
    demoUrl: "https://seo-content-analyzer-8ejjnvzumnno2wkqvvmftq.streamlit.app/",
    githubUrl: "YOUR_GITHUB_REPO_URL"
  },
  {
    id: "content",
    title: "Content Similarity Analyzer",
    description: "Advanced content comparison and analysis tool",
    demoUrl: "https://content-similarity-hnbf7tzpuqyn3vpo3dhbcn.streamlit.app/",
    githubUrl: "YOUR_GITHUB_REPO_URL"
  },
  {
    id: "seo",
    title: "SEO Audit Tools",
    description: "Comprehensive SEO analysis and optimization suite",
    demoUrl: "https://seo-tools-cdzsbcae8gnzijkgsa6vw7.streamlit.app/",
    githubUrl: "YOUR_GITHUB_REPO_URL"
  }
];

// Project card images and configurations (for backward compatibility)
export const projectCardImages = {
  "keyword": {
    image: Logo,
    demoUrl: "https://seo-content-analyzer-8ejjnvzumnno2wkqvvmftq.streamlit.app/"
  },
  "content": {
    image: Logo,
    demoUrl: "https://content-similarity-hnbf7tzpuqyn3vpo3dhbcn.streamlit.app/"
  },
  "seo": {
    image: Logo,
    demoUrl: "https://seo-tools-cdzsbcae8gnzijkgsa6vw7.streamlit.app/"
  }
};

/* Contact Info
 ************************************************************** 
  Add your formspree endpoint below.
  https://formspree.io/
*/
export const formspreeUrl = "https://formspree.io/f/YourEndpoint";

// Footer icons theme (light or dark)
export const footerTheme = "dark";

// GitHub URL
export const githubUrl = "https://github.com/amal-alexander";
