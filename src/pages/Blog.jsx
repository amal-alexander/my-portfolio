import React from "react";
import BlogComponent from "../components/Blog/Blog";
import { updateTitle } from "../utils";

const Blog = () => {
  React.useEffect(() => {
    updateTitle("Blog | Portfolio");
  }, []);

  return <BlogComponent />;
};

export default Blog;
