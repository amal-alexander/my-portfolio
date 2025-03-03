import React from 'react';
import styled from 'styled-components';
import BlogCard from './BlogCard';
import { Container } from '../styles/GlobalStyles';
import AdSense from 'react-adsense';

const BlogSection = styled.section`
  padding: 50px 0;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
`;

const BlogHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const BlogTitle = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 15px;
`;

const BlogDescription = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  max-width: 600px;
  margin: 0 auto;
`;

const AdContainer = styled.div`
  margin: 30px 0;
  text-align: center;
`;

// Sample blog posts data - later we'll move this to a separate data file
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React Development",
    excerpt: "Learn the fundamentals of React and start building modern web applications...",
    image: "/blog-images/react-dev.jpg",
    date: "March 2, 2025",
    slug: "getting-started-with-react"
  },
  {
    id: 2,
    title: "Web Development Best Practices in 2025",
    excerpt: "Discover the latest trends and best practices in web development...",
    image: "/blog-images/web-dev-2025.jpg",
    date: "March 1, 2025",
    slug: "web-dev-best-practices-2025"
  },
  {
    id: 3,
    title: "Monetizing Your Developer Blog",
    excerpt: "Learn effective strategies to monetize your technical blog and create passive income...",
    image: "/blog-images/blog-monetization.jpg",
    date: "February 28, 2025",
    slug: "monetizing-developer-blog"
  }
];

const Blog = () => {
  return (
    <BlogSection>
      <Container>
        <BlogHeader>
          <BlogTitle>Blog</BlogTitle>
          <BlogDescription>
            Insights, tutorials, and thoughts on web development, programming, and technology.
          </BlogDescription>
        </BlogHeader>

        {/* Top Ad Space */}
        <AdContainer>
          <AdSense.Google
            client="ca-pub-xxxxxxxxxxxxxxxx" // Replace with your AdSense publisher ID
            slot="xxxxxxxxxx" // Replace with your ad slot ID
            style={{ display: 'block' }}
            format="auto"
            responsive="true"
          />
        </AdContainer>

        <BlogGrid>
          {blogPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </BlogGrid>

        {/* Bottom Ad Space */}
        <AdContainer>
          <AdSense.Google
            client="ca-pub-xxxxxxxxxxxxxxxx" // Replace with your AdSense publisher ID
            slot="xxxxxxxxxx" // Replace with your ad slot ID
            style={{ display: 'block' }}
            format="auto"
            responsive="true"
          />
        </AdContainer>
      </Container>
    </BlogSection>
  );
};

export default Blog;
