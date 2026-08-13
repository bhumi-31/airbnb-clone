from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.booking import Booking
from models.listing import Listing
from schemas.booking import BookingCreate, BookingResponse


router = APIRouter(
    prefix="/api/bookings",
    tags=["Bookings"]
)


# =====================================================
# CREATE BOOKING
# =====================================================

@router.post(
    "/",
    response_model=BookingResponse
)
def create_booking(
    booking: BookingCreate,
    db: Session = Depends(get_db)
):

    # Temporary mock logged-in user
    current_user_id = 1


    # Check listing exists

    listing = db.query(Listing).filter(
        Listing.id == booking.listing_id
    ).first()

    if not listing:

        raise HTTPException(
            status_code=404,
            detail="Listing not found"
        )


    # Check guest limit

    if booking.guests > listing.max_guests:

        raise HTTPException(
            status_code=400,
            detail="Too many guests"
        )


    # Check valid dates

    if booking.check_in >= booking.check_out:

        raise HTTPException(
            status_code=400,
            detail="Check-out must be after check-in"
        )


    # Check date overlap

    overlapping_booking = db.query(
        Booking
    ).filter(

        Booking.listing_id ==
        booking.listing_id,

        Booking.check_in <
        booking.check_out,

        Booking.check_out >
        booking.check_in

    ).first()


    if overlapping_booking:

        raise HTTPException(
            status_code=400,
            detail="Listing is not available for these dates"
        )


    # Create booking

    new_booking = Booking(

        user_id=current_user_id,

        listing_id=booking.listing_id,

        check_in=booking.check_in,

        check_out=booking.check_out,

        guests=booking.guests

    )


    db.add(new_booking)

    db.commit()

    db.refresh(new_booking)


    return new_booking


# =====================================================
# GET ALL BOOKINGS
# =====================================================

@router.get(
    "/",
    response_model=list[BookingResponse]
)
def get_bookings(
    db: Session = Depends(get_db)
):

    return db.query(
        Booking
    ).all()


# =====================================================
# MY TRIPS
# =====================================================

@router.get(
    "/my-trips"
)
def get_my_trips(
    db: Session = Depends(get_db)
):

    # Temporary mock logged-in user
    current_user_id = 1


    bookings = (
        db.query(
            Booking,
            Listing
        )
        .join(
            Listing,
            Booking.listing_id ==
            Listing.id
        )
        .filter(
            Booking.user_id ==
            current_user_id
        )
        .all()
    )


    return [

        {
            "id": booking.id,

            "listing_id":
                booking.listing_id,

            "listing_title":
                listing.title,

            "location":
                listing.location,

            "image_url":
                listing.image_url,

            "price_per_night":
                listing.price_per_night,

            "check_in":
                booking.check_in,

            "check_out":
                booking.check_out,

            "guests":
                booking.guests

        }

        for booking, listing
        in bookings

    ]