"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Profile = {
  name: string;
  bio: string;
  profile_picture: string;
  email: string;
  instagram: string;
  cv_url: string;
  linkedin: string; // Add this line
};

export default function AboutPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/profile")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error || !profile) return <div>Error: {error || "Profile not found"}</div>;

  return (
    <main style={{ maxWidth: 600, margin: "2rem auto", textAlign: "center" }}>
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
      <img
        src={profile.profile_picture}
        alt="Profile picture"
        width={150}
        height={150}
        style={{ borderRadius: "50%" }}
      />
      <h1>About Me</h1>
      <p>{profile.bio}</p>
      <div style={{ margin: "1.5rem 0" }}>
        <a
          href={profile.cv_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginRight: 16 }}
        >
          📄 Download CV
        </a>
        <a
          href={`mailto:${profile.email}`}
          style={{ marginRight: 16 }}
        >
          ✉️ Email Me
        </a>
        <a
          href={profile.instagram}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginRight: 16 }}
        >
          📸 Instagram
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          💼 LinkedIn
        </a>
      </div>
    </main>
  );
}