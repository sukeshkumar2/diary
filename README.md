# Diary Application

A full-stack personal diary application built with React, FastAPI, and SQLite.

## Features
- User Authentication (Signup/Login)
- Interactive Dashboard with Calendar
- Write daily entries with Mood Tracking
- Modern, responsive UI

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js & npm

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/sukeshkumar2/diary.git
    cd diary
    ```

2.  **Backend Setup**
    ```bash
    # Create virtual environment
    python3 -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate

    # Install dependencies
    pip install -r backend/requirements.txt
    ```

3.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    cd ..
    ```

## Running the Application

You need to run the Backend and Frontend in **two separate terminal windows**.

**Terminal 1: Backend**
```bash
source venv/bin/activate
uvicorn backend.main:app --reload --port 8000
```

**Terminal 2: Frontend**
```bash
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Stopping the Application

To stop the servers:
1.  Go to the terminal running the process.
2.  Press `Ctrl + C`.
3.  Do this for both the Backend and Frontend terminals.
