interface CardImageProps {
  imageUrl: string;
  title: string;
  imageHeight: string; // Define a prop for the image height
}

export default function CardImage({
  imageUrl,
  title,
  imageHeight,
}: CardImageProps) {
  return (
    <div className="w-full h-auto rounded overflow-hidden space-y-10">
      <img
        className="w-auto mx-auto"
        src={imageUrl}
        alt={title}
        style={{ height: imageHeight }}
      />{" "}
      {/* Set height inline */}
      <div className="mx-10">
        <h2 className="font-bold text-3xl mx-10">{title}</h2>
      </div>
    </div>
  );
}
