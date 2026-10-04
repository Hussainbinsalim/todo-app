# MERN To-Do List Application

This is a full-stack To-Do List web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). 

## Prerequisites
- **Node.js** (v14 or above)
- **MongoDB** (Running locally on `mongodb://127.0.0.1:27017` or update the `.env` file with your remote URI)

## Project Structure
- `backend/` - Contains the Express server, Mongoose schema, and REST API endpoints.
- `frontend/` - Contains the React application created using Vite.

## How to Run the Project

### 1. Setup Backend
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```
   *(The server will start on port 5000 and connect to the local MongoDB database `todo-app`)*

### 2. Setup Frontend
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the displayed URL in your browser (usually `http://localhost:5173`).

## API Endpoints (Backend)
- `GET /api/tasks` — Fetch all tasks
- `POST /api/tasks` — Add a new task
- `PUT /api/tasks/:id` — Update a task (mark complete/incomplete)
- `DELETE /api/tasks/:id` — Delete a task

## Features Completed
- ✅ Backend Express server with Mongoose schema (`title`, `completed`, `createdAt`)
- ✅ All 4 required REST API endpoints fully working
- ✅ Frontend React application with Vite
- ✅ Form to add a new task
- ✅ Task list fetched on page load without full page reload
- ✅ Toggle complete/incomplete status with immediate UI update
- ✅ Delete task functionality with immediate UI update
- ✅ Modern, premium UI design (dark theme, glassmorphism, fluid animations)
