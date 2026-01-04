# Diary Application - Project Documentation

This document provides a complete overview of the Diary Application, explaining how it was built, the purpose of every file, and how the data works.

## 1. Project Overview
This is a full-stack web application designed to be a personal digital diary.
- **Frontend**: Built with **React** (using Vite) to provide a modern, interactive user interface.
- **Backend**: Built with **FastAPI** (Python) to handle logic, authentication, and data storage.
- **Database**: **SQLite** is used for simple, local data storage.

## 2. Running and Stopping the Project

### How to Run
You need two terminal windows open.

**Terminal 1: Backend (Server)**
```bash
source venv/bin/activate
uvicorn backend.main:app --reload --port 8000
```
*   `source venv/bin/activate`: Turns on the Python virtual environment.
*   `uvicorn ...`: Starts the web server.

**Terminal 2: Frontend (UI)**
```bash
cd frontend
npm run dev
```
*   `npm run dev`: Starts the React development server.

### How to Stop
1.  Click inside the terminal window.
2.  Press `Ctrl + C` on your keyboard.
3.  Repeat for both terminals.

---

## 3. Development Journey: How We Built It

### Step 1: The Plan
We started by defining the goal: a diary app where users can sign up, log in, and write entries with mood emojis. We decided on a "Split View" dashboard for better usability.

### Step 2: Backend Setup (The Brain)
We chose **Python's FastAPI** because it's fast and easy to write.
1.  **Virtual Environment (`venv`)**: We created an isolated "box" for our Python dependencies so they don't mess up your system.
2.  **Dependencies**: We installed `fastapi` for the web server, `sqlalchemy` for the database, and `passlib` for password security.
3.  **Database Models**: We defined what a "User" and a "DiaryEntry" look like in code.
4.  **API Endpoints**: We built URL routes (like `/login`, `/entries`) that the frontend can talk to.

### Step 3: Frontend Setup (The Face)
We chose **React** with **Vite** for a fast development experience.
1.  **Scaffolding**: We generated the project structure.
2.  **Routing**: We setup `react-router-dom` to switch between Login, Signup, and Dashboard pages without reloading.
3.  **Styling**: We created a modern design system in `index.css` using CSS variables for consistent colors and spacing.
4.  **Integration**: We connected the Frontend to the Backend using `axios`.

---

## 3. Database: Where is data stored?
We use **SQLite**.
- **Location**: You will see a file named `diary.db` in your project root folder.
- **How it works**: unlike complex servers like PostgreSQL, SQLite stores the entire database in a **single file**. This is perfect for development.
- **ORM**: We use **SQLAlchemy**. It allows us to write Python code (like `user.username`) instead of raw SQL queries (like `SELECT * FROM users`). It automatically translates our Python code into database commands.

> **Note**: For the deployed version (on Render), the free tier does not keep files permanently. If the server restarts, `diary.db` is wiped. For a real production app, we would switch to a cloud database service like PostgreSQL.

---

## 4. File-by-File Explanation

### Backend (`/backend`)
| File | Purpose |
| :--- | :--- |
| **`main.py`** | **The Entry Point**. It initializes the FastAPI app, sets up CORS (so frontend can talk to backend), and defines the URL routes. |
| **`models.py`** | **The Blueprint**. It defines the database tables (`users`, `entries`) using SQLAlchemy classes. |
| **`schemas.py`** | **The Validator**. It checks data coming in and out. For example, it ensures a user trying to sign up actually sends a username and password. |
| **`crud.py`** | **The Worker**. "Create, Read, Update, Delete". This file contains the functions that actually talk to the database (e.g., `create_user`, `get_entries`). |
| **`auth.py`** | **The Bouncer**. Usage functions for hashing passwords (so we never store plain text passwords) and generating/verifying JWT tokens for login. |
| **`database.py`** | **The Connection**. Sets up the connection to the `diary.db` file. |
| **`requirements.txt`**| **The Shopping List**. Lists all Python packages needed to run the app. |

### Frontend (`/frontend`)
| File | Purpose |
| :--- | :--- |
| **`src/main.jsx`** | **The Root**. The very first file executed. It mounts the React app into the HTML page. |
| **`src/App.jsx`** | **The Router**. Defines which component to show for which URL (e.g., show `Login.jsx` for `/login`). Handles "Private Routes" to protect the dashboard. |
| **`src/api.js`** | **The Messenger**. A pre-configured `axios` instance. It automatically adds the user's "Token" to every request so the backend knows who they are. |
| **`src/index.css`** | **The Style**. Global CSS styles, variables (colors, fonts), and resets. |
| **`src/pages/`** | Contains the main screens: `Login`, `Signup`, `Dashboard` (main view), and `Entry` (writing view). |
| **`src/components/`** | Contains reusable parts like `Layout` (the top bar/navigation). |
| **`vercel.json`** | **Deployment Config**. Tells Vercel how to handle the single-page app routing. |
