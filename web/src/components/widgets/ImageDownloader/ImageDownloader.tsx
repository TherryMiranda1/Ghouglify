import { useState } from "react";
import { Button } from "../../ui";

interface Props {
  imageUrl?: string;
  name?: string;
}

export const ImageDownloader = ({ imageUrl, name }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!imageUrl) return;

    try {
      setLoading(true);
      const response = await fetch(imageUrl, {
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error("Error al descargar la imagen");
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const downloadLink = document.createElement("a");
      downloadLink.href = blobUrl;
      downloadLink.download = `${name || "image"}-Ghouglify.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();

      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error al descargar la imagen:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button disabled={!imageUrl || loading} onClick={handleDownload}>
      {loading ? "Descargando..." : "Descargar"}
    </Button>
  );
};
