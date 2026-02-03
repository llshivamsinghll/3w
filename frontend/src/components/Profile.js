import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Post from './Post';
import './Profile.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalLikes: 0,
    totalComments: 0
  });

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/posts`);
      // Filter posts by current user
      const myPosts = response.data.data.filter(post => post.userId === user._id);
      setUserPosts(myPosts);
      
      // Calculate stats
      const totalLikes = myPosts.reduce((sum, post) => sum + post.likesCount, 0);
      const totalComments = myPosts.reduce((sum, post) => sum + post.commentsCount, 0);
      
      setStats({
        totalPosts: myPosts.length,
        totalLikes,
        totalComments
      });
      
      setLoading(false);
    } catch (err) {
      console.error('Failed to load posts', err);
      setLoading(false);
    }
  };

  const handlePostDeleted = () => {
    fetchUserPosts();
  };

  const handlePostLiked = () => {
    fetchUserPosts();
  };

  const handleCommentAdded = () => {
    fetchUserPosts();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="profile-container">Loading...</div>;
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-info">
          <div className="profile-avatar-large">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="profile-details">
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-email">{user.email}</p>
            <p className="profile-handle">@{user.name.toLowerCase().replace(/\s+/g, '')}</p>
          </div>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-number">{stats.totalPosts}</span>
          <span className="stat-label">Posts</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.totalLikes}</span>
          <span className="stat-label">Likes</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.totalComments}</span>
          <span className="stat-label">Comments</span>
        </div>
      </div>

      <div className="profile-actions">
        <button className="btn-edit-profile">Edit Profile</button>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>

      <div className="profile-content">
        <div className="profile-tabs">
          <button className="tab-btn active">My Posts</button>
          <button className="tab-btn">Liked</button>
          <button className="tab-btn">Saved</button>
        </div>

        <div className="profile-posts">
          {userPosts.length === 0 ? (
            <div className="no-posts">You haven't posted anything yet.</div>
          ) : (
            userPosts.map(post => (
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
    </div>
  );
}

export default Profile;
