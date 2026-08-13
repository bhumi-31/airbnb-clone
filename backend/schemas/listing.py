from pydantic import BaseModel

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
    
    
    class Config:
        from_attributes = True