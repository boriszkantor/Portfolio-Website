from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or ["*"] for all origins (not recommended for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Artwork(BaseModel):
    id: int
    title: str
    description: str
    year: int
    images: list[str]  # Change from imageUrl: str to images: list[str]

class Profile(BaseModel):
    name: str
    bio: str
    profile_picture: str  # URL to the profile picture
    email: str
    instagram: str
    cv_url: str
    linkedin: str

# In-memory "database"
artworks = [
    Artwork(
        id=1,
        title="Sunset",
        description="A beautiful sunset over the lake.",
        year=2023,
        images=[
            "https://picsum.photos/200/300?random=1",
            "https://picsum.photos/200/300?random=11"
        ]
    ),
    Artwork(
        id=2,
        title="Forest",
        description="A serene forest with tall trees.",
        year=2024,
        images=[
            "https://picsum.photos/200/300?random=2",
            "https://picsum.photos/200/300?random=12"
        ]
    ),
]

profile = Profile(
    name="Ellie",
    bio="I'm an artist passionate about painting and digital art. I love exploring new techniques and sharing my work with the world.",
    profile_picture="https://picsum.photos/200/200?random=3",
    email="elliemaibutler11@gmail.com",
    instagram="https://instagram.com/elliebutlerart",
    cv_url="/cv.pdf",
    linkedin="https://www.linkedin.com/in/ellie-mai-butler-14281a310"  # Add your LinkedIn URL here
)

@app.get("/artworks", response_model=List[Artwork])
def get_artworks():
    return artworks

@app.post("/artworks", response_model=Artwork)
def add_artwork(artwork: Artwork):
    artworks.append(artwork)
    return artwork

@app.get("/artworks/{artwork_id}", response_model=Artwork)
def get_artwork(artwork_id: int):
    for artwork in artworks:
        if artwork.id == artwork_id:
            return artwork
    raise HTTPException(status_code=404, detail="Artwork not found")

@app.get("/profile", response_model=Profile)
def get_profile():
    return profile