from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base
from models.listing import Listing
from models.booking import Booking
from models.user import User
from routers.listings import router as listing_router
from routers.bookings import router as booking_router
from routers.host import router as host_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(listing_router)
app.include_router(booking_router)
app.include_router(host_router)

@app.get("/")
def root():
    return {"message": "Airbnb Clone API is running"}