"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ArtworkCard from "../../../../components/ArtworkCard";

export default function ArtworkPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [artwork, setArtwork] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8000/artworks/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setArtwork(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!artwork) return <div>Artwork not found.</div>;

  return (
    <main style={{ paddingTop: "4rem" }}>
      <button
        onClick={() => router.back()}
        style={{
          background: "none",
          border: "none",
          fontSize: "2rem",
          cursor: "pointer",
          position: "absolute",
          left: 20,
          top: 20,
        }}
        aria-label="Go back"
      >
        ←
      </button>
      <ArtworkCard
        title={artwork.title}
        description={artwork.description}
        year={artwork.year}
        imageUrl={artwork.images && artwork.images.length > 0 ? artwork.images[0] : ""}
        images={artwork.images || []}
      />
    </main>
  );
}