# Playto Engineering Challenge – Explainer

This document explains the key design decisions, trade-offs, and technical implementation details of the project.

---

## 1. Threaded Comments (Tree Structure)

Comments are modeled using a self-referential foreign key (`parent`).

Each comment belongs to a post and may optionally reference another comment as its parent.  
This adjacency-list approach supports arbitrary nesting depth while keeping the schema simple and relational.

To avoid N+1 query problems:
- All comments for a post are fetched in a single query
- The comment tree is assembled in memory in Python
- The API returns a nested JSON structure

This ensures efficient loading even with deeply nested threads.

---

## 2. Likes and Concurrency Safety

Users are allowed to like a post or comment only once.

This is enforced using database-level unique constraints on:
- `(user, post)`
- `(user, comment)`

These constraints guarantee correctness under concurrent requests and prevent artificial karma inflation.

---

## 3. Karma System Design

Karma is not stored as a field on the User model.

Instead, each like creates a `KarmaEvent` record:
- Post like → +5 karma
- Comment like → +1 karma

This event-based design avoids denormalized counters and provides a clear audit trail of how karma is earned.

---

## 4. Leaderboard (Last 24 Hours Only)

The leaderboard reflects karma earned strictly within the last 24 hours.

It is calculated dynamically using an aggregate query:
- Filter `KarmaEvent` records where `created_at` is within the last 24 hours
- Group results by user
- Sum karma values
- Order by total karma in descending order
- Return the top 5 users

No cached or precomputed daily karma values are stored on the User model.

---

## 5. API Design Choices

Only concrete API endpoints are exposed (e.g. `/api/feed/`, `/api/leaderboard/`).

The API root (`/api/`) is intentionally not defined, which is valid REST practice and avoids unnecessary endpoints.

---

## 6. Content Creation Strategy

For this prototype, posts and comments are created via Django Admin.

This keeps the frontend focused on rendering, interaction, and performance rather than authentication or posting workflows, which were out of scope for the challenge.

---

## 7. Dockerization

The project is fully dockerized using Docker Compose.

Two services are defined:
- Backend (Django + DRF)
- Frontend (React)

The entire application can be started with:
```bash
docker compose up --build

This ensures consistent local setup and simplifies review.

8. Al Usage Audit
Al tools were used to accelerate development.
One example correction:
• An Al-generated approach attempted to store rolling karma values directly on the
User model.
• This was replaced with a dynamic aggregation over KarmaEvent
records to meet the
challenge requirements.
All Al-generated code was reviewed, tested, and corrected where necessary.


Final Notes
This project is intentionally scoped as a prototype.
The focus was placed on:
• Correct data modeling
• Performance-aware queries
• Concurrency safety
• Clear and explainable design decisions