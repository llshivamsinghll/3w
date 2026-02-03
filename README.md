# Setup Instructions

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance

## Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in backend directory:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
CORS_ORIGIN=http://localhost:3000
```

4. Start the backend server:
```bash
npm start
```

Backend will run on `http://localhost:5000`

## Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in frontend directory:
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_NAME=3W
```

4. Start the frontend application:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## Running Both Servers

Open two terminal windows:

Terminal 1 (Backend):
```bash
cd backend
npm start
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```
