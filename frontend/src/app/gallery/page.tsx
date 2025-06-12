"use client";
import { useRouter } from "next/navigation";
import ArtworksList from "../../../components/ArtworksList";

export default function GalleryPage() {
  const router = useRouter();

  return (
    <main>
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
      <h1 style={{ textAlign: "center", margin: "2rem 0", fontSize: "2.5rem" }}>
        Ellie Mai Butler Art
      </h1>
      <h2 style={{ textAlign: "center", margin: "2rem 0" }}>Artworks</h2>
      <ArtworksList />
    </main>
  );
}