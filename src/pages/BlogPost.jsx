import React from "react";
import BlogPostComponent from "../components/Blog/BlogPost";
import { updateTitle } from "../utils";
import { useParams } from "react-router-dom";

const BlogPost = () => {
  const { slug } = useParams();
  
  React.useEffect(() => {
    updateTitle(`${slug} | Blog`);
  }, [slug]);

  return <BlogPostComponent />;
};

export default BlogPost;
