import React, { useState } from 'react';
import { createArticle } from '../services/api';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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
    <div>
      <div style={{fontWeight:500,marginTop:15, fontFamily:'sans-serif'}}>
        Create Article
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          placeholder="Content"
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <Button type="submit" color="primary">Create</Button>
      </form>
    </div>
  );
};

export default ArticleForm;
