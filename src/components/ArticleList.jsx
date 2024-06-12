import React, { useEffect, useState } from 'react';
import { getArticles } from '../services/api';

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
    <div>
      <div>Articles</div>
      <div>
        {articles.map(article => (
          <div key={article.id}>
            <h2>{article.title} </h2>
            <p>={article.content} </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
