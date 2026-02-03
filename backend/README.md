# 3W Backend Server

A RESTful API backend server built with Node.js, Express, and MongoDB.

## Features

- User authentication (register, login)
- JWT-based authorization
- User management (CRUD operations)
- Role-based access control
- Error handling middleware
- MongoDB database integration
- Security best practices

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Copy `.env` file and update the values
   - Set your MongoDB URI
   - Set a secure JWT secret

3. Start MongoDB (if running locally):
```bash
mongod
```

4. Start the server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get single user (Protected)
- `PUT /api/users/:id` - Update user (Protected)
- `DELETE /api/users/:id` - Delete user (Admin only)

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js      # Database configuration
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js          # Authentication middleware
│   │   └── errorHandler.js  # Error handling
│   ├── models/
│   │   └── User.js          # User model
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   └── server.js            # App entry point
├── .env                     # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## Environment Variables

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/3w_database
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
```

## Usage Examples

### Register a new user
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Access protected routes
```bash
GET /api/auth/me
Authorization: Bearer YOUR_JWT_TOKEN
```

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Protected routes with middleware
- Role-based access control
- Input validation
- CORS enabled

## License

ISC
