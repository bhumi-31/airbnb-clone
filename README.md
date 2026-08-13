# Airbnb Clone

A full-stack Airbnb-inspired web application built with **Next.js** and **FastAPI**. The application allows guests to explore and search property listings, view property details, make bookings, manage trips and favorites, while hosts can create and manage listings and view reservations.

## Live Demo

- **Frontend:** https://airbnb-clone-amber-three.vercel.app/
- **Backend API:** https://airbnb-clone-ul2z.onrender.com/

> The backend is deployed on Render's free tier, so the first request may take a few seconds if the service has been inactive.

---

## Features

### Guest Features

- Browse all available listings
- Search listings by location
- Filter listings by property type
- Filter listings by number of guests
- Select check-in and check-out dates
- View detailed property information
- View price breakdown
- Make a booking
- View booked trips
- Add and remove favorite listings
- Pagination for listings
- Toast notifications for actions and errors

### Host Features

- View hosted listings
- Create a new listing
- Edit an existing listing
- Delete a listing
- View reservations
- Separate host navigation for listings and reservations
- Confirmation dialog before deleting a listing

### Backend Features

- RESTful API using FastAPI
- SQLAlchemy ORM
- SQLite database
- Pydantic request validation
- Listing search and filtering
- Pagination
- Booking management
- Host listing management
- Database relationships
- Database seeding
- CORS configuration

---

## Tech Stack

### Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Next.js App Router

### Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

### Database

- SQLite

### Deployment

- Vercel - Frontend
- Render - Backend
- GitHub - Source Code

---

## Architecture

```text
                    ┌─────────────────────────┐
                    │       Next.js           │
                    │       Frontend          │
                    │        Vercel           │
                    └────────────┬────────────┘
                                 │
                                 │ REST API
                                 │ HTTP Requests
                                 ▼
                    ┌─────────────────────────┐
                    │        FastAPI          │
                    │        Backend          │
                    │         Render          │
                    └────────────┬────────────┘
                                 │
                                 │ SQLAlchemy
                                 ▼
                    ┌─────────────────────────┐
                    │         SQLite          │
                    │        Database         │
                    └─────────────────────────┘
```

The frontend communicates with the backend through REST APIs. FastAPI handles application logic and database operations using SQLAlchemy.

---

## Project Structure

```text
airbnb-clone/
│
├── frontend/
│   ├── app/
│   │   ├── checkout/
│   │   ├── favorites/
│   │   ├── host/
│   │   │   ├── create/
│   │   │   ├── edit/[id]/
│   │   │   └── reservations/
│   │   ├── listings/[id]/
│   │   ├── trips/
│   │   └── page.tsx
│   │
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
│   │
│   ├── schemas/
│   ├── routers/
│   │   ├── listings.py
│   │   ├── bookings.py
│   │   └── host.py
│   │
│   ├── database.py
│   ├── main.py
│   ├── seed.py
│   ├── requirements.txt
│   └── airbnb.db
│
└── README.md
```

---

## Database Schema

The application uses three main entities:

### User

Stores users and hosts.

```text
users
├── id        INTEGER PRIMARY KEY
├── name      STRING
└── role      STRING
```

### Listing

Stores property information.

```text
listings
├── id
├── title
├── description
├── location
├── price_per_night
├── property_type
├── max_guests
├── rating
├── image_url
├── amenities
└── host_id → users.id
```

### Booking

Stores booking information for a property.

```text
bookings
├── id
├── listing_id
├── check_in
├── check_out
└── guests
```

### Relationships

```text
User
 │
 │ 1
 │
 ├──────────< Listing
 │
 │
 └──────────< Booking
                    │
                    │
                    ▼
                  Listing
```

A host can own multiple listings, and listings can have multiple bookings.

---

## API Overview

The backend exposes REST APIs using FastAPI.

### Listings

#### Get Listings

```http
GET /api/listings/
```

Supports search and pagination parameters:

```text
location
guests
check_in
check_out
page
limit
```

Example:

```http
GET /api/listings/?location=Goa&guests=4&page=1&limit=6
```

#### Get Listing Details

```http
GET /api/listings/{listing_id}
```

---

### Bookings

#### Create Booking

```http
POST /api/bookings/
```

Example request:

```json
{
  "listing_id": 1,
  "check_in": "2026-08-20",
  "check_out": "2026-08-23",
  "guests": 2
}
```

The API validates the dates, guest count, and listing before creating the booking.

---

### Host

Host APIs are used for:

- Retrieving host listings
- Creating listings
- Updating listings
- Deleting listings
- Retrieving host reservations

---

## Application Routes

| Route | Description |
|---|---|
| `/` | Explore all listings |
| `/listings/[id]` | Listing details |
| `/checkout` | Booking checkout |
| `/favorites` | Favorite listings |
| `/trips` | User trips |
| `/host` | Host dashboard |
| `/host/create` | Create listing |
| `/host/edit/[id]` | Edit listing |
| `/host/reservations` | Host reservations |

---

# Local Development

## Prerequisites

Make sure you have installed:

- Node.js
- npm
- Python 3
- Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/bhumi-31/airbnb-clone.git
cd airbnb-clone
```

---

# Backend Setup

Navigate to the backend:

```bash
cd backend
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

macOS / Linux:

```bash
source venv/bin/activate
```

Windows:

```bash
venv\Scripts\activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Start Backend

```bash
python -m uvicorn main:app --reload
```

Backend will run at:

```text
http://127.0.0.1:8000
```

FastAPI Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Database Seeding

The project includes a seed script containing sample property listings.

Run:

```bash
python seed.py
```

The seed process creates the required host and adds the sample listings to the database.

---

# Frontend Setup

Open a new terminal and navigate to:

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a file:

```text
.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### Start Development Server

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:3000
```

---

# Production Build

Before deployment, verify the frontend production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

# Deployment

## Frontend - Vercel

The Next.js frontend is deployed on Vercel.

Production environment variable:

```env
NEXT_PUBLIC_API_URL=https://airbnb-clone-ul2z.onrender.com
```

After changing environment variables, the Vercel project should be redeployed.

## Backend - Render

The FastAPI backend is deployed on Render.

### Root Directory

```text
backend
```

### Build Command

```bash
pip install -r requirements.txt
```

### Start Command

```bash
python -m uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

## Search and Pagination

The listings API supports query parameters for searching and pagination.

Example:

```http
GET /api/listings/?location=Rishikesh&guests=4&page=1&limit=6
```

### Query Parameters

| Parameter | Description |
|---|---|
| `location` | Search listings by location |
| `guests` | Filter by guest capacity |
| `check_in` | Check-in date |
| `check_out` | Check-out date |
| `page` | Page number |
| `limit` | Number of listings per page |

The frontend uses Previous and Next controls to navigate through listing pages.

---

## Booking Flow

```text
Select Listing
      ↓
Select Check-in Date
      ↓
Select Check-out Date
      ↓
Select Number of Guests
      ↓
Calculate Price
      ↓
Reserve
      ↓
Backend Validates Booking
      ↓
Booking Created
      ↓
View Trip
```

---

## Host Flow

```text
Host Dashboard
      │
      ├── Your Listings
      │       │
      │       ├── Create Listing
      │       ├── Edit Listing
      │       └── Delete Listing
      │
      └── Reservations
              │
              └── View Guest Bookings
```

---

## Mocked / Placeholder Features

The following features are intentionally simplified or mocked according to the project requirements:

- Real payment processing
- Guest-host messaging
- Real-time map with live pricing
- Identity verification
- Full user authentication

The booking flow currently creates a booking through the backend without integrating a real payment gateway.

---

## Optional Features

The project can be extended with:

- Interactive map with listing pins
- Reviews after completed stays
- Superhost badges
- Image upload to cloud storage
- Dark mode
- Advanced authentication
- PostgreSQL database
- Real payment integration

---

## Testing

The backend API can be tested using:

- FastAPI Swagger UI
- Postman
- Frontend application

Swagger:

```text
http://127.0.0.1:8000/docs
```

Production backend:

```text
https://airbnb-clone-ul2z.onrender.com
```

---

## Environment Variables

### Frontend

Local:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Production:

```env
NEXT_PUBLIC_API_URL=https://airbnb-clone-ul2z.onrender.com
```

`.env.local` should not be committed to GitHub.

---

## Deliverables

### Source Code

Public GitHub repository containing:

```text
frontend/
backend/
README.md
```

### Documentation

This README includes:

- Setup instructions
- Project structure
- Architecture overview
- Database schema
- API overview
- Deployment instructions

### Demo

**Live Application:**

https://airbnb-clone-amber-three.vercel.app/

**Backend API:**

https://airbnb-clone-ul2z.onrender.com/

---

## Author

**Bhumika Narula**

GitHub: https://github.com/bhumi-31/airbnb-clone