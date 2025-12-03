# MoodNest - Digital Journal & Mood Tracker

# The Hosted Links are as follows;
`Frontend --"https://mood-tracker-i0u77rztu-cwabhis-projects.vercel.app"`

`Backend --"https://mood-nest.onrender.com"`

# The Proposal is as follows:

# 1. Project Title
MoodNest – A Digital Journal & Mood Tracker

# 2. Problem Statement
In today’s fast-paced world, people are constantly juggling work, studies, and personal
life often without taking time to reflect on how they truly feel. Many struggle to maintain
emotional balance or mental clarity because they don’t have a safe and structured
space to express their thoughts.
For example, someone might feel anxious after a stressful day at work but have no easy
way to record or understand what triggered that feeling. Over time, this lack of
self-reflection can lead to burnout or emotional exhaustion.

# 3. System Architecture
The overall system follows a three-tier architecture:
Frontend → Backend (API) → Database
This structure separates the user interface, server logic, and data storage, ensuring that
the system remains scalable, secure, and easy to maintain.

● Frontend (Client Side) - The frontend is the user-facing part of the application
where users interact with the system. Built with React.js, it provides a smooth
and responsive single-page experience.

● Backend (Server Side) - The backend acts as the brain of the application — it
handles user requests, applies business logic, interacts with the database, and
sends responses back to the frontend.Built with Node.js + Express

● Database - The database stores all data — such as user information, journal
entries, and mood logs.Stored in PostgreSQL (relational) via Prisma ORM.

● Authentication - This ensures that only authorized users can access personal
journals.

# 4. Key Features
● Authentication & Authorization - Users can securely sign up and log in using their
email and password. JSON Web Tokens (JWT) are used to maintain stateless sessions.
The system supports two user roles — User (for journaling) and Admin (for managing
users, entries, or reviewing analytics)

● CRUD Operations -
1. Create Journal Entries - Users can write and save daily journal entries with
optional titles, moods, and tags to reflect their thoughts and experiences.

2. Read / View Entries - Users can view all their journal entries in
chronological order or filter by mood/date.

3. Update Entries - Users can edit their previous journal entries anytime for
corrections or updates.

4. Delete Entries - Users can delete specific journal entries when they wish
to remove them permanently.

● Mood Tracking & Analytics -
1. Daily Mood Input - Alongside journaling, users can select their mood
from preset options (e.g., Happy, Calm, Tired, Anxious, Focused).

2. Mood History Visualization - A graph that displays trends of emotional
states over time, helping users identify patterns in their well-being.

3. Weekly & Monthly Insights - The app will summarize the mood and
journal data to show how often certain emotions appear, providing helpful
insights for self-awareness.

● Frontend Routing - Pages: Home Page, Signup Page, Login Page,Dashboard
Page, Entry Page, Journal Details Page, Mood Insights Page, Profile Page.

● Searching & Filtering -
1. Keyword Search - Users can quickly search journal entries using
keywords, moods, or tags.

2. Date-based Filtering - Filter journal entries by specific date ranges to
review past reflections or progress.

● Sorting -

1. It allows users to sort their journal entries by various parameters for better
organization and review. Entries can be sorted by date (newest or oldest
first), or title.

● Pagination -

1. The application implements pagination by displaying journal entries in sets
of 15 per page. This approach ensures that users can browse their
journals efficiently without overwhelming the interface or slowing down
performance.

● Hosting & Deployment - The entire application is deployed online: Frontend via
Vercel, Backend via Render, and Database via Supabase.

# 5. Tech Stack

Frontend React.js, React Router, Axios, TailwindCSS

Backend Node.js, Express.js

Database PostgreSQL (via Prisma ORM)

Authentication JWT (JSON Web Token)

Hosting Vercel (Frontend), Render(Backend)

# 6. API Overview
Endpoint Method Description Access

/api/auth/signup

POST Register new user Public

/api/auth/login
POST Authenticate user Public

/api/entries GET Get all journal entries of a user Authenticated
/api/entries/:id
GET Get a specific journal entry by ID Authenticated

/api/entries POST Create a new journal entry Authenticated
/api/entries/:id
PUT Update an existing journal entry Authenticated

/api/entries/:id
DELETE Delete a journal entry Authenticated

**Made with ❤️ for mental wellness and self-reflection**
