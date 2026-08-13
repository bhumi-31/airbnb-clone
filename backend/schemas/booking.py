from datetime import date
from pydantic import BaseModel


class BookingCreate(BaseModel):
    listing_id: int
    check_in: date
    check_out: date
    guests: int


class BookingResponse(BaseModel):
    id: int
    user_id: int
    listing_id: int
    check_in: date
    check_out: date
    guests: int

    class Config:
        from_attributes = True