# Playto Community Feed – Engineering Challenge

This repository contains a prototype **Community Feed** application built for the Playto engineering challenge.

---

## Tech Stack

- **Backend:** Django, Django REST Framework  
- **Frontend:** React (Create React App)  
- **Database:** SQLite  
- **Containerization:** Docker & Docker Compose  

---

## Features

- Community feed with text posts
- Threaded (nested) comments (Reddit-style)
- Likes on posts and comments
- Karma system:
  - Post like = +5 karma
  - Comment like = +1 karma
- Top 5 users leaderboard based on karma earned in the last 24 hours
- Concurrency-safe likes (no double-like inflation)

---

## Running the Project (Docker)

### Requirements
- Docker
- Docker Compose

### 📦 Installation & Setup
1. Clone the repository
   ```bash
   cd ~/Desktop
   git clone https://github.com/Gokula17/PLAYTO-ENGINEERING-CHALLENGE.git

2. Navigate into the project
   ```bash
   cd PLAYTO-ENGINEERING-CHALLENGE

3. Install frontend dependencies
   ```bash
   cd frontend
   npm install
   cd ..

4. Build and run the application
    ```bash
    docker compose up --build

-----

### 🌐 Access the Application
Once the containers are running, open your browser at:
for frondend ui : 
   ```bash
   http://localhost:3000
```
for backend Django admin :
  ```bash
  http://localhost:8000/admin
```

-----

### 🛑 Stopping the Application
```bash
docker compose down


