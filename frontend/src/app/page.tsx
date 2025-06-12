"use client";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <h1 style={{ textAlign: "center", margin: "2rem 0", fontSize: "2.5rem" }}>
        Ellie Mai Butler Art
      </h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
        <Link href="/about">
          <button style={{ padding: "0.75rem 2rem", fontSize: "1rem", borderRadius: "8px", cursor: "pointer" }}>
            About Me
          </button>
        </Link>
        <Link href="/gallery">
          <button style={{ padding: "0.75rem 2rem", fontSize: "1rem", borderRadius: "8px", cursor: "pointer" }}>
            Gallery
          </button>
        </Link>
      </div>
    </main>
  );
}