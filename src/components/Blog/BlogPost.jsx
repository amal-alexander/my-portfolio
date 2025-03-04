import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const PostContainer = styled(Container)`
  max-width: 800px;
  padding: 50px 20px;
`;

const PostHeader = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const PostTitle = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 15px;
`;

const PostMeta = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 0.9rem;
  margin-bottom: 20px;
`;

const PostImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 30px;
`;

const PostContent = styled.div`
  color: ${({ theme }) => theme.text};
  line-height: 1.8;
  font-size: 1.1rem;

  h2, h3, h4 {
    margin: 25px 0 15px;
    color: ${({ theme }) => theme.text};
  }

  p {
    margin-bottom: 20px;
  }

  code {
    background: ${({ theme }) => theme.code_background};
    padding: 2px 6px;
    border-radius: 4px;
  }

  pre {
    background: ${({ theme }) => theme.code_background};
    padding: 15px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 20px 0;
  }
`;

const AdContainer = styled.div`
  margin: 30px 0;
  text-align: center;
`;

const ShareSection = styled.div`
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const ShareButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const ShareButton = styled.button`
  padding: 8px 15px;
  border-radius: 5px;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: white;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

// Sample blog post data - later we'll move this to a CMS or database
const blogPosts = {
  "getting-started-with-react": {
    title: "Getting Started with React Development",
    date: "March 2, 2025",
    image: "/blog-images/react-dev.jpg",
    content: `
# Getting Started with React Development

React is a powerful JavaScript library for building user interfaces. In this guide, we'll cover the basics of React development and help you get started with your first React application.

## Prerequisites

Before we begin, make sure you have:
- Node.js installed on your computer
- A code editor (VS Code recommended)
- Basic knowledge of HTML, CSS, and JavaScript

## Setting Up Your First React Project

1. Open your terminal
2. Run the following command:
\`\`\`bash
npx create-react-app my-first-app
cd my-first-app
npm start
\`\`\`

## Understanding React Components

React components are the building blocks of any React application. Here's a simple component example:

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
\`\`\`

## Next Steps

- Learn about React Hooks
- Understand state management
- Explore React Router
- Practice building small projects
    `
  }
  // Add more blog posts here
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts[slug];

  if (!post) {
    return <Container>Post not found</Container>;
  }

  const handleShare = (platform) => {
    const url = window.location.href;
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${post.title}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`);
        break;
      default:
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
    }
  };

  return (
    <PostContainer>
      <PostHeader>
        <PostTitle>{post.title}</PostTitle>
        <PostMeta>{post.date}</PostMeta>
      </PostHeader>

      {post.image && <PostImage src={post.image} alt={post.title} />}

      {/* Top Ad */}
      <AdContainer>
        <AdSense.Google
          client="ca-pub-xxxxxxxxxxxxxxxx"
          slot="xxxxxxxxxx"
          style={{ display: 'block' }}
          format="auto"
          responsive="true"
        />
      </AdContainer>

      <PostContent>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </PostContent>

      {/* Middle Ad */}
      <AdContainer>
        <AdSense.Google
          client="ca-pub-xxxxxxxxxxxxxxxx"
          slot="xxxxxxxxxx"
          style={{ display: 'block' }}
          format="auto"
          responsive="true"
        />
      </AdContainer>

      <ShareSection>
        <h3>Share this post</h3>
        <ShareButtons>
          <ShareButton onClick={() => handleShare('twitter')}>Twitter</ShareButton>
          <ShareButton onClick={() => handleShare('linkedin')}>LinkedIn</ShareButton>
          <ShareButton onClick={() => handleShare('copy')}>Copy Link</ShareButton>
        </ShareButtons>
      </ShareSection>

      {/* Bottom Ad */}
      <AdContainer>
        <AdSense.Google
          client="ca-pub-xxxxxxxxxxxxxxxx"
          slot="xxxxxxxxxx"
          style={{ display: 'block' }}
          format="auto"
          responsive="true"
        />
      </AdContainer>
    </PostContainer>
  );
};

export default BlogPost;
