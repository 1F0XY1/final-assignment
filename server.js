const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Custom query route
server.get('/posts', (req, res) => {
  const db = router.db; // Get database instance
  let posts = db.get('posts').value(); // Get all posts

  // Filter by userId if provided
  if (req.query.userId) {
    posts = posts.filter(post => 
      post.userId === parseInt(req.query.userId)
    );
  }

  // Filter by id if provided
  if (req.query.id) {
    posts = posts.filter(post => 
      post.id === req.query.id
    );
  }

  res.json(posts);
});

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
  console.log('Available queries:');
  console.log('  /posts?userId=1');
  console.log('  /posts?id=0ef2');
  console.log('  /posts?userId=1&id=0ef2');
}); 