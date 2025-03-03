import React from "react";
// State
import { useGetUsersQuery } from "../app/apiSlice";
// Components
import Hero from "../components/Hero";
import AboutMe from "../components/AboutMe";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import BackToTop from "../components/BackToTop";
// Config
import { moreInfo } from "../config";
// Utils
import { updateTitle } from "../utils";
// Components for Flying Icons
import FlyingIcons from "../components/FlyingIcons";

const Home = () => {
  const { data: userData } = useGetUsersQuery();

  React.useEffect(() => {
    updateTitle(`${userData.name} | Portfolio`);
  }, [userData]);

  return (
    <>
      <Hero name={userData.name} />
      <main>
        <AboutMe
          avatar_url={userData.avatar_url}
          bio={userData.bio}
          moreInfo={moreInfo}
        />
        <Skills>
          <FlyingIcons />
        </Skills>
        <Projects />
        <Contact />
      </main>
      <BackToTop />
    </>
  );
};

export default Home;
