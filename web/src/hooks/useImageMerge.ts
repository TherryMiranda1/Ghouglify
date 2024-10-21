import { useEffect, useState } from "react";

export const useImageMerge = (
  imageUrl?: string,
  backgroundUrl?: string,
  onSuccess?: (url: string) => void,
  darkness = 0.3
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string>("");

  useEffect(() => {
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      });
    };

    const processImage = async () => {
      if (!imageUrl || !backgroundUrl) return;
      setIsLoading(true);

      try {
        const [img, bgImg] = await Promise.all([
          loadImage(imageUrl),
          loadImage(backgroundUrl),
        ]);

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          throw new Error("Failed to create canvas context");
        }

        canvas.width = img.width;
        canvas.height = img.height;

        // Dibujar las imágenes en el canvas
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        ctx.fillStyle = `rgba(0, 0, 0, ${darkness})`; // Oscuridad controlada por el valor `darkness`
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL("image/png");
        setResultImage(dataUrl);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    processImage();
  }, [imageUrl, backgroundUrl]);

  useEffect(() => {
    if (resultImage) onSuccess?.(resultImage);
  }, [resultImage, onSuccess]);

  return { isLoading, resultImage };
};
