const testApi = async () => {
  try {
    // Get all posts
    const posts = await fetch('http://localhost:3001/posts');
    console.log('All posts:', await posts.json());

    // Get single post
    const post = await fetch('http://localhost:3001/posts/1');
    console.log('Single post:', await post.json());

    // Create post
    const newPost = await fetch('http://localhost:3001/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Test Post',
        body: 'This is a test post'
      })
    });
    console.log('Created post:', await newPost.json());

  } catch (error) {
    console.error('API Error:', error);
  }
};

export default testApi; 