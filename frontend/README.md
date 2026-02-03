# 3W Frontend - React.js

Social media application frontend built with React.js.

## Features

- User authentication (Login/Register)
- Create text posts
- View public feed with all posts
- Like and comment on posts
- Delete own posts and comments
- Responsive design

## Installation

```bash
cd frontend
npm install
```

## Configuration

The app is configured to proxy API requests to the backend server at `http://localhost:5000`.

Make sure your backend server is running before starting the frontend.

## Running the App

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Feed.js
│   │   ├── CreatePost.js
│   │   └── Post.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## Features Implemented

### Authentication
- Login with email and password
- Register new account
- JWT token storage
- Protected routes
- Auto-login on page refresh

### Posts
- Create text posts
- View all posts in feed
- Display username, date, likes count, comments count
- Delete own posts

### Interactions
- Like/unlike posts
- Add comments
- View all comments
- Real-time updates

## Tech Stack

- React 18
- React Router DOM v6
- Axios for API calls
- Context API for state management
- CSS for styling
