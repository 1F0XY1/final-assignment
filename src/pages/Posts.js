import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Posts = () => {
  // Define all state variables
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newPost, setNewPost] = useState({
    title: '',
    body: '',
    userId: 1
  });

  // Load posts on component mount
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3001/posts');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
        console.error('Error loading posts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare post data
      const postData = {
        title: newPost.title,
        body: newPost.body,
        userId: 1,
        timestamp: new Date().toISOString()
      };

      console.log('Sending post data:', postData); // Debug log

      // Send POST request
      const response = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create post');
      }

      const savedPost = await response.json();
      console.log('Server response:', savedPost); // Debug log

      // Update UI with new post
      setPosts(prevPosts => [{
        ...savedPost,
        source: 'local'
      }, ...prevPosts]);

      // Reset form
      setNewPost({
        title: '',
        body: '',
        userId: 1
      });

      alert('Post created successfully!');
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err.message);
      alert(`Error creating post: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete post');
      }

      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      alert('Post deleted successfully!');
    } catch (err) {
      console.error('Error deleting post:', err);
      setError(err.message);
      alert(`Error deleting post: ${err.message}`);
    }
  };

  if (loading && posts.length === 0) return <div className="container mt-5">Loading...</div>;
  if (error) return <div className="container mt-5">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1>Blog Posts</h1>

      {/* Create Post Form */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Create New Post</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={newPost.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="body" className="form-label">Content</label>
              <textarea
                className="form-control"
                id="body"
                name="body"
                rows="3"
                value={newPost.body}
                onChange={handleInputChange}
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Post'}
            </button>
          </form>
        </div>
      </div>

      {/* Posts List */}
      <div className="row">
        {posts.length === 0 ? (
          <div className="col-12">
            <p>No posts found. Create your first post!</p>
          </div>
        ) : (
          posts.map(post => (
            <div key={post.id} className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <small className="text-muted">Post ID: {post.id} | User ID: {post.userId}</small>
                    {post.source === 'local' && (
                      <>
                        <span className="badge bg-success me-2">New Post</span>
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(post.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                  <h5 className="card-title mt-2">{post.title}</h5>
                  <p className="card-text">{post.body.substring(0, 100)}...</p>
                  {post.timestamp && (
                    <small className="text-muted d-block mb-2">
                      Posted: {new Date(post.timestamp).toLocaleString()}
                    </small>
                  )}
                  <Link to={`/posts/${post.id}`} className="btn btn-primary">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Posts;
