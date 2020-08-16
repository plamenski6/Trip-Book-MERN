## FOR THE APP
### This is a React.js application using Node.js and Express.js for backend and MongoDB for database.
Create your own trip book. Share your amazing travels with the world,
help people organize their unforgettable vacations. Explore unknown places of paradise
following the trip book of other travelers. Search trips and travelers from all over the world.
Review all your activities and notifications. Make your trip book looks beautiful and detailed.

The application is made for two purposes - sharing and help.
Achieve all your dreams without fear of the unknown, monotonous or your financial opportunities. Share your experience to help others.

Available features that Trip-book offers:
- Sharing each of your travels with the whole world;
- Own book/account to manage entirely by yourself;
- Manage your own account;
- Forms for reporting irregularities and for sharing ideas;
- Short registration with which you get access to everything that Trip-book offers;
- User authentication (signup + login);
- User authorization (controlling access to certain resources);
- Convenient and easy to understand view for both large and small screens;

### Using Dependencies
For the frontend:
- react
- react-dom
- react-router-dom
- react-scripts
- react-transition-group

For the backend:
- bcrypt
- body-parser
- express
- express-validator
- jsonwebtoken
- mongoose
- mongoose-unique-validator
- uuid
- nodemon

### Main Routes
1. API Endpoints for users:
**/api/...**
- GET .../ - Retrieve list of all users.
- POST .../auth - Create new user + log user in(signup + login).
2. API Endpoints for places:
**/api/places/...**
- GET .../:uid/places - Retrieve list of all places for a given user id(uid).
- GET .../:pid - Get a specific place by place id(pid).
- POST .../new - Create a new place.
- PATCH .../:pid - Update a place by id(pid).
- DELETE .../:pid - Delete a place by id(pid).
3. About Page:
**/api/about**

### Hosting
For the backend i am using Heroku to deploy and run server, and for the frontend Firebase hosting.<br />
To start the app in production mode, you can access it from this link: [trip-book-mern.web.app](https://trip-book-mern.web.app/)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment
