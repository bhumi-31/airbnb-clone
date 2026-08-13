from database import SessionLocal
from models.listing import Listing


new_listings = [
    Listing(
        title="Desert Camp",
        description="Unique desert stay with beautiful sunset views and traditional interiors.",
        location="Jaisalmer, India",
        price_per_night=3500,
        property_type="Cabin",
        max_guests=4,
        rating=4.7,
        image_url="https://images.unsplash.com/photo-1548013146-72479768bada"
    ),

    Listing(
        title="Forest Cottage",
        description="Quiet cottage surrounded by lush greenery and peaceful nature.",
        location="Rishikesh, India",
        price_per_night=4000,
        property_type="Cottage",
        max_guests=4,
        rating=4.8,
        image_url="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8"
    ),

    Listing(
        title="Luxury City Apartment",
        description="Stylish apartment with modern interiors in a prime city location.",
        location="Delhi, India",
        price_per_night=4800,
        property_type="Apartment",
        max_guests=3,
        rating=4.7,
        image_url="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
    ),

    Listing(
        title="Hilltop Villa",
        description="Beautiful hilltop villa offering peaceful surroundings and mountain views.",
        location="Shimla, India",
        price_per_night=5600,
        property_type="Villa",
        max_guests=6,
        rating=4.9,
        image_url="https://images.unsplash.com/photo-1510798831971-661eb04b3739"
    ),

    Listing(
        title="Riverside Cottage",
        description="Relaxing cottage beside the river, perfect for a peaceful getaway.",
        location="Rishikesh, India",
        price_per_night=3900,
        property_type="Cottage",
        max_guests=4,
        rating=4.6,
        image_url="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8"
    ),

    Listing(
        title="Beachside Apartment",
        description="Modern apartment close to the beach with beautiful coastal views.",
        location="Goa, India",
        price_per_night=5000,
        property_type="Apartment",
        max_guests=4,
        rating=4.8,
        image_url="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"
    ),
]


db = SessionLocal()

try:
    existing_count = db.query(Listing).count()

    if existing_count < 12:
        db.add_all(new_listings)
        db.commit()
        print("6 new listings added successfully")
    else:
        print("Listings already seeded")

finally:
    db.close()