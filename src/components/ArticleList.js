import React, { useEffect, useState } from 'react';
import { getArticles } from '../services/api';
import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';

const ArticleList = ({ token }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articles = await getArticles(token);
        setArticles(articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, [articles]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Articles</Typography>
      <List>
        {articles.map(article => (
          <ListItem key={article.id}>
            <ListItemText primary={article.title} secondary={article.content} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ArticleList;
