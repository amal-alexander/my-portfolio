// src/FlyingIcons.js
import React from "react";
import { Icon } from "@iconify/react";
import "./styles.css";  // Make sure this path is correct

const FlyingIcons = () => {
  const skillIcons = [
    "mdi:language-html5",
    "ion:logo-css3",
    "fa6-brands:js",
    "ri:bootstrap-fill",
    "mdi:react",
    "file-icons:styledcomponents",
    "akar-icons:redux-fill",
    "bi:git",
    "fa6-brands:square-github",
  ];

  return (
    <div className="flying-icons-container">
      {skillIcons.map((icon, index) => (
        <div
          key={index}
          className="flying-icon"
          style={{
            animationDuration: `${Math.random() * 10 + 5}s`, // Random duration for variety
            animationDelay: `${Math.random() * 5}s`, // Random delay for better randomness
            fontSize: `${Math.random() * 30 + 20}px`, // Random size for icons
          }}
        >
          <Icon icon={icon} className="display-4" />
        </div>
      ))}
    </div>
  );
};

export default FlyingIcons;
