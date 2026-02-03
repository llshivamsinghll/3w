import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Post.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Post({ post, onPostDeleted, onPostLiked, onCommentAdded }) {
  const { user } = useAuth();
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    try {
      await axios.put(`${API_URL}/api/posts/${post._id}/like`);
      onPostLiked();
    } catch (err) {
      console.error('Failed to like post', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`${API_URL}/api/posts/${post._id}`);
        onPostDeleted();
      } catch (err) {
        console.error('Failed to delete post', err);
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!commentText.trim()) return;

    try {
      await axios.post(`${API_URL}/api/posts/${post._id}/comment`, { text: commentText });
      setCommentText('');
      onCommentAdded();
      loadComments();
    } catch (err) {
      console.error('Failed to add comment', err);
    }
  };

  const loadComments = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/posts/${post._id}`);
      setComments(response.data.data.comments);
    } catch (err) {
      console.error('Failed to load comments', err);
    }
  };

  const toggleComments = () => {
    if (!showComments) {
      loadComments();
    }
    setShowComments(!showComments);
  };

  const isOwner = user && user._id === post.userId;
  const formatDate = (date) => {
    const postDate = new Date(date);
    const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    return postDate.toLocaleDateString('en-US', options);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-user">
          <div className="user-avatar">{post.userName.charAt(0).toUpperCase()}</div>
          <div className="user-info">
            <div className="user-name-row">
              <span className="user-name">{post.userName}</span>
              <span className="user-handle">@{post.userName.toLowerCase().replace(/\s+/g, '')}</span>
            </div>
            <div className="post-date">{formatDate(post.createdAt)}</div>
          </div>
        </div>
        
        {isOwner ? (
          <button onClick={handleDelete} className="delete-btn">
            Delete
          </button>
        ) : (
          <button className="follow-btn">
            Follow
          </button>
        )}
      </div>

      <div className="post-content">
        {post.text}
      </div>

      <div className="post-stats">
        <span>❤️ {post.likesCount}</span>
        <span>💬 {post.commentsCount}</span>
      </div>

      <div className="post-actions">
        <button onClick={handleLike} className="action-btn">
          ❤️
        </button>
        <button onClick={toggleComments} className="action-btn">
          💬
        </button>
        <button className="action-btn">
          🔍
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="comment-input"
            />
            <button type="submit" className="comment-btn">Send</button>
          </form>

          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment._id} className="comment">
                <div className="comment-avatar">{comment.userName.charAt(0).toUpperCase()}</div>
                <div className="comment-content">
                  <div className="comment-user">{comment.userName}</div>
                  <div className="comment-text">{comment.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
