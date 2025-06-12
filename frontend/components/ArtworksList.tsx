"use client";
import { useEffect, useState } from "react";
import ArtworkCard from "./ArtworkCard";
import Link from "next/link";

type Artwork = {
  id: number;
  title: string;
  description: string;
  year: number;
  images: string[];
};

const ArtworksList: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/artworks")
      .then((res) => res.json())
      .then((data) => {
        setArtworks(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {artworks.map((artwork) => (
        <Link
          key={artwork.id}
          href={`/artworks/${artwork.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ArtworkCard
            title={artwork.title}
            description={artwork.description}
            year={artwork.year}
            imageUrl={artwork.images && artwork.images.length > 0 ? artwork.images[0] : ""}
            images={[]}
          />
        </Link>
      ))}
    </div>
  );
};

export default ArtworksList;