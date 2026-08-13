🏠 Airbnb Clone

A full-stack Airbnb-inspired web application for discovering stays, searching and filtering listings, making bookings, managing favorites, and handling host listings and reservations.

🌐 Live Demo

Frontend: https://airbnb-clone-amber-three.vercel.app/

Backend API: https://airbnb-clone-ul2z.onrender.com/

The backend is hosted on Render's free tier, so the first request may take a few seconds after inactivity.

✨ Features

Guest

Browse property listings

Search by location

Filter by property type

Filter by number of guests

Select check-in and check-out dates

View listing details

Make bookings

View trips

Manage favorite listings

Host

Create listings

Edit listings

View hosted properties

View reservations

Backend

RESTful APIs with FastAPI

SQLAlchemy ORM

SQLite database

Pydantic validation

CORS configuration

Database seeding with sample listings

Search and pagination support

🛠️ Tech Stack

Layer

Technologies

Frontend

Next.js, React, TypeScript, Tailwind CSS

Backend

Python, FastAPI, SQLAlchemy, Pydantic

Database

SQLite

API Server

Uvicorn

Deployment

Vercel + Render

Version Control

Git + GitHub

🏗️ Architecture

┌──────────────────────────────┐
│          Next.js             │
│          Frontend            │
│           Vercel             │
└──────────────┬───────────────┘
               │
               │ REST API / HTTP
               ▼
┌──────────────────────────────┐
│          FastAPI             │
│          Backend             │
│           Render             │
└──────────────┬───────────────┘
               │
               │ SQLAlchemy ORM
               ▼
┌──────────────────────────────┐
│           SQLite             │
│          Database             │
└──────────────────────────────┘

The Next.js frontend communicates with the FastAPI backend through REST APIs. FastAPI handles business logic and database operations through SQLAlchemy.

📁 Project Structure

airbnb-clone/
│
├── frontend/
│   ├── app/
│   │   ├── checkout/
│   │   ├── favorites/
│   │   ├── host/
│   │   ├── listings/
│   │   ├── trips/
│   │   └── page.tsx
│   ├── components/
│   ├── lib/
│   ├── types/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── models/
│   │   ├── user.py
│   │   ├── listing.py
│   │   └── booking.py
│   ├── schemas/
│   ├── routers/
│   │   ├── listings.py
│   │   ├── bookings.py
│   │   └── host.py
│   ├── database.py
│   ├── main.py
│   ├── seed.py
│   ├── requirements.txt
│   └── airbnb.db
│
└── README.md

🗄️ Database Schema

User

Field

Type

Description

id

Integer

Primary key

name

String

User name

role

String

User role

Listing

Field

Type

Description

id

Integer

Primary key

title

String

Property title

description

Text

Property description

location

String

Property location

price_per_night

Float

Price per night

property_type

String

Villa, House, Apartment, etc.

max_guests

Integer

Maximum guests

rating

Float

Property rating

image_url

String

Property image

amenities

String

Property amenities

host_id

Integer

Foreign key to User

Booking

Bookings connect users and listings and contain booking information such as check-in date, check-out date, and number of guests.

User ───────< Booking >─────── Listing
  │                              │
  └──────────────<───────────────┘

A host can have multiple listings, and listings can have multiple bookings.

🔌 API Overview

Listings

Get Listings

GET /api/listings/

Supports query parameters such as:

GET /api/listings/?location=Goa&guests=4&page=1&limit=6

Parameters:

Parameter

Description

location

Search by location

guests

Filter by guest capacity

check_in

Check-in date

check_out

Check-out date

page

Page number

limit

Number of results per page

Get Listing

GET /api/listings/{listing_id}

Bookings

Create Booking

POST /api/bookings/

Example request:

{
  "listing_id": 1,
  "check_in": "2026-08-20",
  "check_out": "2026-08-23",
  "guests": 2
}

Host

Host APIs provide operations for:

Creating listings

Updating listings

Managing hosted properties

Viewing reservations

Interactive API documentation is available through FastAPI Swagger UI.

⚙️ Local Setup

1. Clone the repository

git clone https://github.com/bhumi-31/airbnb-clone.git
cd airbnb-clone

2. Backend

cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

Start the backend:

python -m uvicorn main:app --reload

Backend:

http://127.0.0.1:8000

Swagger UI:

http://127.0.0.1:8000/docs

3. Seed the database

python seed.py

The seed script creates the required host and sample property listings.

4. Frontend

Open another terminal:

cd frontend
npm install

Create .env.local:

NEXT_PUBLIC_API_URL=http://127.0.0.1:8000

Start the frontend:

npm run dev

Frontend:

http://localhost:3000

🏭 Production Build

To verify the Next.js production build:

npm run build

Run the production frontend:

npm start

☁️ Deployment

Frontend — Vercel

The frontend is deployed on Vercel.

Production environment variable:

NEXT_PUBLIC_API_URL=https://airbnb-clone-ul2z.onrender.com

Backend — Render

The FastAPI backend is deployed on Render.

Start command:

python -m uvicorn main:app --host 0.0.0.0 --port $PORT

📱 Application Routes

Route

Purpose

/

Explore stays

/listings/[id]

Listing details

/checkout

Booking checkout

/favorites

Favorite listings

/trips

User trips

/host

Host dashboard

/host/create

Create listing

/host/edit/[id]

Edit listing

/host/reservations

Host reservations

🎯 Learning Outcomes

This project provided hands-on experience with:

Full-stack web development

Next.js App Router

React and TypeScript

REST API design

FastAPI

SQLAlchemy ORM

Relational database design

Search and pagination

Frontend-backend integration

Environment variables

Production deployment

Vercel and Render

🚀 Future Improvements

JWT-based authentication

PostgreSQL production database

Payment integration

Reviews and ratings

Advanced filters

Map-based search

Image upload

Improved availability management

Email notifications

👩‍💻 Author

Bhumika Narula

GitHub: https://github.com/bhumi-31

📦 Deliverables

Source Code: Public GitHub repository containing frontend/ and backend/

Documentation: This README contains setup instructions, architecture overview, database schema, and API overview

Demo: Hosted frontend and backend links provided above