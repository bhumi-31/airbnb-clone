from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base
from models.listing import Listing
from models.booking import Booking
from models.user import User
from routers.listings import router as listing_router
from routers.bookings import router as booking_router
from routers.host import router as host_router
from seed import seed_database

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://airbnb-clone-amber-three.vercel.app",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)
seed_database()

app.include_router(listing_router)
app.include_router(booking_router)
app.include_router(host_router)

@app.get("/")
def root():
    return {"message": "Airbnb Clone API is running"}