type ArtworkCardProps = {
  title: string;
  description: string;
  year: number;
  imageUrl: string;
  images: string[]; // Added images prop
};

const ArtworkCard: React.FC<ArtworkCardProps> = ({ title, description, year, imageUrl, images }) => (
  <div style={{
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
    maxWidth: 340,
    margin: "1rem",
    background: "#fff",
    overflow: "hidden"
  }}>
    <img
      src={imageUrl}
      alt={title}
      style={{
        width: "100%",
        height: "220px",
        objectFit: "cover",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px"
      }}
    />
    <div style={{ padding: "1rem" }}>
      <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "1.25rem" }}>{title} <span style={{ color: "#888", fontSize: "1rem" }}>({year})</span></h2>
      <p style={{ margin: 0, color: "#555" }}>{description}</p>
    </div>
    {/* Display all images for an artwork */}
    {images.map((imgUrl: string, idx: number) => (
      <img
        key={idx}
        src={imgUrl}
        alt={`${title} image ${idx + 1}`}
        style={{ maxWidth: "100%", marginBottom: "1rem" }}
      />
    ))}
  </div>
);

export default ArtworkCard;