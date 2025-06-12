
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

class Artwork(BaseModel):
    id: int
    title: str
    description: str
    year: int
    image_url: str

# In-memory "database"
artworks = [
    Artwork(id=1, title="Sunset", description="A beautiful sunset over the lake.", year=2023,
            image_url="https://imgur.com/gallery/lake-starting-to-open-up-CagbY1D#0j13sz0"),
    Artwork(id=2, title="Forest", description="A serene forest with tall trees.", year=2024,
            image_url="https://imgur.com/gallery/forest-MaEWwC1#hvR14RS"),
]

@app.get("/artworks", response_model=List[Artwork])
def get_artworks():
    return artworks

@app.post("/artworks", response_model=Artwork)
def add_artwork(artwork: Artwork):
    artworks.append(artwork)
    return artwork