from sqlalchemy import Column, Integer, Date, ForeignKey
from database import Base

class Booking(Base):
    __tablename__ = "bookings"
    
    id = Column(Integer, primary_key=True, index=True)
    
    listing_id = Column(
        Integer,
        ForeignKey("listings.id"),
        nullable=False
    )
    
    check_in = Column(Date, nullable=False)
    check_out = Column(Date, nullable=False)
    
    guests = Column(Integer, nullable=False) 
    
    user_id = Column(Integer,ForeignKey("users.id"),nullable=False)
