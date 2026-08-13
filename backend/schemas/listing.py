from pydantic import BaseModel


class ListingCreate(BaseModel):
    title: str
    description: str
    location: str
    price_per_night: float
    property_type: str
    max_guests: int
    image_url: str
    amenities: str | None = None


class ListingResponse(BaseModel):
    id: int
    title: str
    description: str
    location: str
    price_per_night: float
    property_type: str
    max_guests: int
    rating: float
    image_url: str
    amenities: str | None = None
    host_id: int

    class Config:
        from_attributes = True