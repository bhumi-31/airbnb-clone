from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.listing import Listing
from schemas.listing import ListingResponse

router = APIRouter(
    prefix = "/api/listings",
    tags = ["Listings"]
)

@router.get("/", response_model=list[ListingResponse])
def get_listings(db: Session = Depends(get_db)):
    listings = db.query(Listing).all()
    
    return listings