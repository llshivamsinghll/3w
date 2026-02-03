import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import CreatePost from './CreatePost';
import './Feed.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [activeFilter, setActiveFilter] = useState('allPost');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/posts`);
      setPosts(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load posts');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = () => {
    fetchPosts();
  };

  const handlePostDeleted = () => {
    fetchPosts();
  };

  const handlePostLiked = () => {
    fetchPosts();
  };

  const handleCommentAdded = () => {
    fetchPosts();
  };

  const filterPosts = () => {
    let filtered = [...posts];
    
    if (activeFilter === 'mostLiked') {
      filtered.sort((a, b) => b.likesCount - a.likesCount);
    } else if (activeFilter === 'mostCommented') {
      filtered.sort((a, b) => b.commentsCount - a.commentsCount);
    }
    
    return filtered;
  };

  if (loading) {
    return <div className="feed-container">Loading...</div>;
  }

  return (
    <div className="feed-wrapper">
      <div className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search promotions, users, posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">🔍</button>
        </div>
        <div className="user-icon">
          <div className="user-avatar-btn">👤</div>
        </div>
      </div>

      <div className="feed-container">
        <div className="feed-header">
          <h2 className="feed-title">Create Post</h2>
          <div className="feed-tabs">
            <button
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Posts
            </button>
            <button
              className={`tab-btn ${activeTab === 'promotions' ? 'active' : ''}`}
              onClick={() => setActiveTab('promotions')}
            >
              Promotions
            </button>
          </div>
        </div>

        <CreatePost onPostCreated={handlePostCreated} />
        
        <div className="filter-tabs">
          <button
            className={`filter-btn ${activeFilter === 'allPost' ? 'active' : ''}`}
            onClick={() => setActiveFilter('allPost')}
          >
            All Post
          </button>
          <button
            className={`filter-btn ${activeFilter === 'mostLiked' ? 'active' : ''}`}
            onClick={() => setActiveFilter('mostLiked')}
          >
            Most Liked
          </button>
          <button
            className={`filter-btn ${activeFilter === 'mostCommented' ? 'active' : ''}`}
            onClick={() => setActiveFilter('mostCommented')}
          >
            Most Commented
          </button>
          <button
            className={`filter-btn ${activeFilter === 'mostShared' ? 'active' : ''}`}
            onClick={() => setActiveFilter('mostShared')}
          >
            Most Shared
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
        
        <div className="posts-list">
          {filterPosts().length === 0 ? (
            <div className="no-posts">No posts yet. Be the first to post!</div>
          ) : (
            filterPosts().map(post => (
              <Post
                key={post._id}
                post={post}
                onPostDeleted={handlePostDeleted}
                onPostLiked={handlePostLiked}
                onCommentAdded={handleCommentAdded}
              />
            ))
          )}
        </div>
      </div>

      <div className="bottom-nav">
        <button className="nav-item">🏠</button>
        <button className="nav-item">📋</button>
        <button className="nav-item active">🌐</button>
        <button className="nav-item">📊</button>
      </div>

      <button className="fab">+</button>
    </div>
  );
}

export default Feed;
