from database import SessionLocal
from models.listing import Listing

listings = [
    Listing(
        title="Luxury Beach Villa",
        description="Beautiful beachfront villa with a private pool and stunning ocean views.",
        location="Goa, India",
        price_per_night=6500,
        property_type="Villa",
        max_guests=6,
        rating=4.8,
        image_url="https://images.unsplash.com/photo-1564501049412-61c2a3083791"
    ),
    
    Listing(
        title="Cozy Mountain Cabin",
        description="Peaceful wooden cabin surrounded by mountains and nature.",
        location="Manali, India",
        price_per_night=4500,
        property_type="Cabin",
        max_guests=4,
        rating=4.9,
        image_url="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8"
    ),
    Listing(
        title="Modern City Apartment",
        description="Modern apartment located in the heart of Mumbai.",
        location="Mumbai, India",
        price_per_night=3800,
        property_type="Apartment",
        max_guests=3,
        rating=4.7,
        image_url="https://images.unsplash.com/photo-1502672023488-70e25813eb80"
    ),
    Listing(
        title="Heritage Haveli",
        description="Traditional heritage home with beautiful architecture.",
        location="Jaipur, India",
        price_per_night=5200,
        property_type="House",
        max_guests=5,
        rating=4.9,
        image_url="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
    ),
    Listing(
        title="Lake View Retreat",
        description="Relaxing stay overlooking a beautiful lake.",
        location="Udaipur, India",
        price_per_night=5800,
        property_type="Villa",
        max_guests=4,
        rating=4.8,
        image_url="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
    ),
    Listing(
        title="Kerala Beach House",
        description="Comfortable beach house perfect for a relaxing getaway.",
        location="Kerala, India",
        price_per_night=4200,
        property_type="House",
        max_guests=5,
        rating=4.6,
        image_url="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2"
    ),
]

db = SessionLocal()

try:
    db.add_all(listings)
    db.commit()
    print("Listing seeded successfully")
finally:
    db.close()