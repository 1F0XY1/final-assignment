import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    body: ''
  });

  useEffect(() => {
    // First check if this is a local post
    const localPosts = JSON.parse(localStorage.getItem('localPosts') || '[]');
    const localPost = localPosts.find(p => p.id.toString() === id);

    if (localPost) {
      setPost(localPost);
      // Get local comments for this post
      const localComments = JSON.parse(localStorage.getItem(`comments_${id}`) || '[]');
      setComments(localComments);
      setLoading(false);
    } else {
      // If not a local post, fetch from API
      Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      ])
        .then(([postRes, commentsRes]) => Promise.all([postRes.json(), commentsRes.json()]))
        .then(([postData, commentsData]) => {
          setPost(postData);
          // Get any local comments for this API post
          const localComments = JSON.parse(localStorage.getItem(`comments_${id}`) || '[]');
          // Combine API comments with local comments
          setComments([...localComments, ...commentsData]);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    const commentData = {
      ...newComment,
      postId: parseInt(id),
      id: Date.now(), // Generate unique ID
      timestamp: new Date().toISOString(), // Add timestamp for sorting
      isLocal: true // Flag to identify local comments
    };

    // Save comment locally
    const existingComments = JSON.parse(localStorage.getItem(`comments_${id}`) || '[]');
    const updatedComments = [commentData, ...existingComments];
    localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));

    // Update state - add new comment at the top
    setComments(prev => [commentData, ...prev]);
    
    // Clear form
    setNewComment({
      name: '',
      email: '',
      body: ''
    });

    // Show success message
    alert('Comment added successfully!');
  };

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (error) return <div className="container mt-5">Error: {error}</div>;
  if (!post) return <div className="container mt-5">Post not found</div>;

  return (
    <div className="container mt-5">
      <Link to="/posts" className="btn btn-secondary mb-3">
        ← Back to Posts
      </Link>
      
      {/* Post Content */}
      <div className="card mb-4">
        <div className="card-body">
          <small className="text-muted">Post ID: {post.id}</small>
          <h1 className="card-title mt-2">{post.title}</h1>
          <p className="card-text">{post.body}</p>
        </div>
      </div>

      {/* Add Comment Form */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Add a Comment</h5>
          <form onSubmit={handleCommentSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={newComment.name}
                onChange={(e) => setNewComment({...newComment, name: e.target.value})}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={newComment.email}
                onChange={(e) => setNewComment({...newComment, email: e.target.value})}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="comment" className="form-label">Comment</label>
              <textarea
                className="form-control"
                id="comment"
                rows="3"
                value={newComment.body}
                onChange={(e) => setNewComment({...newComment, body: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Comment
            </button>
          </form>
        </div>
      </div>

      {/* Comments Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Comments ({comments.length})</h2>
      </div>
      
      {comments.map(comment => (
        <div key={comment.id} className="card mb-3">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h5 className="card-title">{comment.name}</h5>
              {comment.isLocal && (
                <span className="badge bg-primary">New</span>
              )}
            </div>
            <h6 className="card-subtitle mb-2 text-muted">{comment.email}</h6>
            <p className="card-text">{comment.body}</p>
            {comment.timestamp && (
              <small className="text-muted">
                Posted on: {new Date(comment.timestamp).toLocaleString()}
              </small>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostDetails; 