const fs = require('fs');
const path = require('path');

const dbData = {
  posts: [],
  comments: []
};

fs.writeFileSync(
  path.join(__dirname, 'db.json'),
  JSON.stringify(dbData, null, 2),
  'utf8'
);

console.log('db.json created successfully'); 