import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BlogCardWrapper = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 10px;
  padding: 20px;
  margin: 15px 0;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const BlogTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  margin-bottom: 10px;
`;

const BlogExcerpt = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 0.9rem;
  margin-bottom: 15px;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 0.8rem;
`;

const ReadMore = styled(Link)`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const BlogCard = ({ post }) => {
  return (
    <BlogCardWrapper>
      {post.image && <BlogImage src={post.image} alt={post.title} />}
      <BlogTitle>{post.title}</BlogTitle>
      <BlogExcerpt>{post.excerpt}</BlogExcerpt>
      <BlogMeta>
        <span>{post.date}</span>
        <ReadMore to={`/blog/${post.slug}`}>Read More →</ReadMore>
      </BlogMeta>
    </BlogCardWrapper>
  );
};

export default BlogCard;
