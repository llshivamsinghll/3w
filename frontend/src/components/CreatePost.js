import React, { useState } from 'react';
import axios from 'axios';
import './CreatePost.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function CreatePost({ onPostCreated }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Please enter some text');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.post(`${API_URL}/api/posts`, { text });
      setText('');
      onPostCreated();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    }

    setLoading(false);
  };

  return (
    <div className="create-post-card">
      <form onSubmit={handleSubmit}>
        <textarea
          className="post-textarea"
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="2"
        />
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="post-actions-row">
          <div className="post-icons">
            <button type="button" className="icon-btn">📷</button>
            <button type="button" className="icon-btn">😊</button>
            <button type="button" className="icon-btn">☰</button>
          </div>
          <button type="button" className="promote-btn">
            📢 Promote
          </button>
          <button type="submit" className="post-submit-btn" disabled={loading || !text.trim()}>
            {loading ? '...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
