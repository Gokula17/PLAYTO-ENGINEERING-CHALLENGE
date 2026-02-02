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

### Start the application
```bash
docker compose up --build

Access URLs
After the containers are running:
Frontend (Community Feed UI):
http://localhost:3000
Backend Admin (create users, posts, comments):
http://localhost:8000/admin/
Feed API:
http://localhost:8000/api/feed/
Leaderboard API (last 24 hours):
http://localhost:8000/api/leaderboard/

Creating Posts and Comments
For this prototype, posts and comments are created via Django Admin:
Open http://localhost:8000/admin/
Log in as a superuser
Create users
Create posts
Create comments (optionally selecting a parent comment for replies)
Open http://localhost:3000 to see the content live
This approach keeps the prototype focused on backend correctness, performance, and data modeling rather than authentication or posting UI workflows.

Notes
The /api/ root endpoint is intentionally not defined.
Only concrete API endpoints (e.g. /api/feed/) are exposed.
This project is a prototype focused on correctness, performance, and explainability.