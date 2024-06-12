import React, { useState } from 'react';
import { createArticle } from '../services/api';
import { TextField, Button, Container, Typography } from '@mui/material';

const ArticleForm = ({ token }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
//   const [author, setAuthor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(title)
    // console.log(content)
    try {
      await createArticle({ title, content}, token);
      setTitle('');
      setContent('');
    //   setAuthor('');
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Create Article</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Content"
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        {/* <TextField
          label="Author"
          fullWidth
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        /> */}
        <Button type="submit" variant="contained" color="primary">Create</Button>
      </form>
    </Container>
  );
};

export default ArticleForm;
