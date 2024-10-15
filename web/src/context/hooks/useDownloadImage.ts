import { useState } from "react";

export const useDownloadImage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async (imageUrl: string, name?: string) => {
    if (!imageUrl) return;

    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  return { isLoading, handleDownload };
};
