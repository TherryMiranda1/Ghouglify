import { useEffect, useState } from "react";

export const useImageMerge = (
  imageUrl?: string,
  backgroundUrl?: string,
  onSuccess?: (url: string) => void
) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const processImage = () => {
      if (!imageUrl || !backgroundUrl) return;
      setIsLoading(true);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = imageUrl;

      const bgImg = new Image();
      bgImg.crossOrigin = "Anonymous";
      bgImg.src = backgroundUrl;

      img.onload = () => {
        bgImg.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;

          ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);

          const dataUrl = canvas.toDataURL("image/png");

          onSuccess?.(dataUrl);
          setIsLoading(false);
        };
      };
    };

    processImage();
  }, [imageUrl, backgroundUrl]);

  return { isLoading };
};
