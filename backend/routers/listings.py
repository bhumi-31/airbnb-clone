
from datetime import date

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.listing import Listing
from models.booking import Booking
from schemas.listing import ListingResponse

router = APIRouter(
    prefix = "/api/listings",
    tags = ["Listings"]
)

@router.get("/", response_model=list[ListingResponse])
def get_listings(
    location : str | None = None,
    guests: int | None = None,
    check_in: date | None = None,
    check_out: date | None = None,
    page : int = 1,
    limit : int = 6,
    db: Session = Depends(get_db)
):
    query = db.query(Listing)
    
    if location:
        query = query.filter(Listing.location.ilike(f"%{location}%"))
        
    if guests:
        query = query.filter(Listing.max_guests >= guests)
    
    if check_in and check_out:
        if check_out <= check_in:
            return []
        
        # find listing that are already booked
        
        booking_listing_ids = db.query(
            Booking.listing_id
        ).filter(
            Booking.check_in < check_out,
            Booking.check_out > check_in
        )
        
        # Remove unavailable listings
        
        query = query.filter(
            ~Listing.id.in_(booking_listing_ids)
        )
    
    offset = (page - 1) * limit
    
    return query.offset(offset).limit(limit).all()


@router.get("/{listing_id}", response_model=ListingResponse)
def get_listing(
    listing_id: int,
    db: Session = Depends(get_db)
):
    listing = db.query(Listing).filter(
        Listing.id == listing_id
    ).first()
    
    if not listing:
        raise HTTPException(
            status_code=404,
            detail="Listing not found"
        )
    
    return listing

