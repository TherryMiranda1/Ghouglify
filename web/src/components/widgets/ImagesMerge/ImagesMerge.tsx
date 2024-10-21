import React, { useEffect } from "react";

interface Props {
  image: string;
  background: string;
  onImageProcessed: (dataUrl: string) => void;
}

export const ImageMerge: React.FC<Props> = ({
  image,
  background,
  onImageProcessed,
}) => {
  useEffect(() => {
    const processImage = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = image;

      const bgImg = new Image();
      bgImg.crossOrigin = "Anonymous";
      bgImg.src = background;

      img.onload = () => {
        bgImg.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;

          ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

          ctx.drawImage(img, 0, 0);

          const dataUrl = canvas.toDataURL("image/png");

          onImageProcessed(dataUrl);
        };
      };
    };

    processImage();
  }, [image, background, onImageProcessed]);
  return <></>;
};
