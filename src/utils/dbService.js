const LOCAL_API_URL = 'http://localhost:3001';

export const dbService = {
  // Get all posts
  getAllPosts: async () => {
    const response = await fetch(`${LOCAL_API_URL}/posts`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  },

  // Get posts by userId
  getPostsByUserId: async (userId) => {
    const response = await fetch(`${LOCAL_API_URL}/posts?userId=${userId}`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  },

  // Get posts with multiple filters
  getFilteredPosts: async (filters) => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`${LOCAL_API_URL}/posts?${queryParams}`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  },

  // Create new post
  createPost: async (postData) => {
    const response = await fetch(`${LOCAL_API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData)
    });
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
  },

  // Delete post
  deletePost: async (id) => {
    const response = await fetch(`${LOCAL_API_URL}/posts/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete post');
    return response.json();
  }
}; 