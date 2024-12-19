Getting Started with Create React App
This project was bootstrapped with Create React App.

Available Scripts
In the project directory, you can run the following commands:

npm start
Runs the app in development mode.
Open http://localhost:3000 to view it in your browser.
The page will reload when you make changes, and any lint errors will be displayed in the console.

npm test
Launches the test runner in interactive watch mode.
For more information on running tests, refer to the React Testing documentation.

npm run build
Builds the app for production to the build folder.
The build is minified, and the filenames include hashes for optimal performance.
Your app is now ready to be deployed!
For more details, see the deployment documentation.

npm run eject
Warning: This is a one-way operation. Once you eject, you cannot go back.
If you're not satisfied with the default build tool and configuration, you can eject to gain full control. This command will remove the single build dependency and copy all the configuration files (webpack, Babel, ESLint, etc.) into your project. After ejecting, all commands (except eject) will refer to the copied scripts, which you can customize.

You don't have to use eject unless you're ready for advanced configuration. The default configuration is suitable for small to medium deployments.

Learn More
Create React App documentation
React documentation
Code Splitting
For more information, visit Code Splitting.

Analyzing the Bundle Size
Learn how to analyze the bundle size here.

Making a Progressive Web App
Follow the guide to make your app a Progressive Web App here.

Advanced Configuration
For more advanced configurations, refer to Advanced Configuration.

Deployment
Learn how to deploy your app here.

Troubleshooting: npm run build Fails to Minify
For troubleshooting, visit npm run build fails to minify.

Setting up Local API
Start your local API server by running the following command:
bash
Copy code
json-server --watch db.json --port 3001
Access your API at:
--------------------------locally ----------------------------------------------------------------------------------------
Get all posts:
plaintext
Copy code
http://localhost:3001/posts


Get a specific post by ID:
plaintext
Copy code
http://localhost:3001/posts/{id}
or
plaintext
Copy code
http://localhost:3001/posts?id={id}
The data will be saved in your db.json file and persist between server restarts. You can:

Create new posts
Add comments
View changes in the API endpoints
See the updated db.json file
This provides a fully functional API that actually saves changes, unlike JSONPlaceholder, which is read-only.

External API Endpoints (JSONPlaceholder)
You can also use external data from the following endpoints:
-------------------------------------------------------------------------------NOT LOCALLY
Get all posts:
javascript
Copy code
fetch('https://jsonplaceholder.typicode.com/posts')

Get a single post:
javascript
Copy code
fetch('https://jsonplaceholder.typicode.com/posts/1')

Get comments for a post:
javascript
Copy code
fetch('https://jsonplaceholder.typicode.com/posts/1/comments')

Get users:
javascript
Copy code
fetch('https://jsonplaceholder.typicode.com/users')
This version should now be easier to read and navigate!






