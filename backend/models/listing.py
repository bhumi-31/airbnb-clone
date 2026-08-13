from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey
from database import Base


class Listing(Base):
    __tablename__ = "listings"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    location = Column(String, nullable=False)
    price_per_night = Column(Float, nullable=False)
    property_type = Column(String, nullable=False)
    max_guests = Column(Integer, nullable=False)
    rating = Column(Float, default=0.0)
    image_url = Column(String, nullable=False)
    amenities = Column(String, nullable=True)

    host_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )