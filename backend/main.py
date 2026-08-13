from fastapi import FastAPI
from database import Base, engine
from models import listing
from routers import listings

Base.metadata.create_all(bind=engine)

app = FastAPI();

@app.get("/")
def home():
    return{
        "message" : "Airbnb API is running"
    }
    
app.include_router(listings.router)
