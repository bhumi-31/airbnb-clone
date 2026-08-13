from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.listing import Listing
from models.booking import Booking
from schemas.listing import ListingCreate, ListingResponse


router = APIRouter(
    prefix="/api/host",
    tags=["Host"]
)


# Get host listings

@router.get(
    "/listings",
    response_model=list[ListingResponse]
)
def get_host_listings(
    host_id: int,
    db: Session = Depends(get_db)
):
    return db.query(Listing).filter(
        Listing.host_id == host_id
    ).all()


# Create listing

@router.post(
    "/listings",
    response_model=ListingResponse
)
def create_listing(
    host_id: int,
    listing: ListingCreate,
    db: Session = Depends(get_db)
):
    new_listing = Listing(
        title=listing.title,
        description=listing.description,
        location=listing.location,
        price_per_night=listing.price_per_night,
        property_type=listing.property_type,
        max_guests=listing.max_guests,
        image_url=listing.image_url,
        amenities=listing.amenities,
        host_id=host_id,
        rating=0.0
    )

    db.add(new_listing)
    db.commit()
    db.refresh(new_listing)

    return new_listing


# Update listing

@router.put(
    "/listings/{listing_id}",
    response_model=ListingResponse
)
def update_listing(
    listing_id: int,
    host_id: int,
    listing: ListingCreate,
    db: Session = Depends(get_db)
):
    existing_listing = db.query(Listing).filter(
        Listing.id == listing_id,
        Listing.host_id == host_id
    ).first()

    if not existing_listing:
        raise HTTPException(
            status_code=404,
            detail="Listing not found"
        )

    existing_listing.title = listing.title
    existing_listing.description = listing.description
    existing_listing.location = listing.location
    existing_listing.price_per_night = listing.price_per_night
    existing_listing.property_type = listing.property_type
    existing_listing.max_guests = listing.max_guests
    existing_listing.image_url = listing.image_url
    existing_listing.amenities = listing.amenities

    db.commit()
    db.refresh(existing_listing)

    return existing_listing


# Delete listing

@router.delete(
    "/listings/{listing_id}"
)
def delete_listing(
    listing_id: int,
    host_id: int,
    db: Session = Depends(get_db)
):
    listing = db.query(Listing).filter(
        Listing.id == listing_id,
        Listing.host_id == host_id
    ).first()

    if not listing:
        raise HTTPException(
            status_code=404,
            detail="Listing not found"
        )

    db.delete(listing)
    db.commit()

    return {
        "message": "Listing deleted successfully"
    }


# Get bookings for host listings

@router.get(
    "/bookings"
)
def get_host_bookings(
    host_id: int,
    db: Session = Depends(get_db)
):
    bookings = (
        db.query(Booking, Listing)
        .join(
            Listing,
            Booking.listing_id == Listing.id
        )
        .filter(
            Listing.host_id == host_id
        )
        .all()
    )

    return [
        {
            "id": booking.id,
            "listing_id": booking.listing_id,
            "listing_title": listing.title,
            "location": listing.location,
            "price_per_night": listing.price_per_night,
            "check_in": booking.check_in,
            "check_out": booking.check_out,
            "guests": booking.guests,
        }
        for booking, listing in bookings
    ]