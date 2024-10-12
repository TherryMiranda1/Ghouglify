/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Image, Section, Button } from "../../ui";

interface Props {
  value?: any;
  onChange?: (e: any, isFile?: boolean) => void;
}

const useImage = () => {
  const [currentImage, setCurrentImage] = useState<{
    title: string;
    content: FileReader["result"];
  } | null>(null);

  return {
    currentImage,
    setCurrentImage,
  };
};

export const InputDrop = ({ onChange, value }: Props) => {
  const { currentImage, setCurrentImage } = useImage();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: any) => {
    e.preventDefault();
    onChange?.(e.target.files[0], true);
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        
        setCurrentImage({
          title: file.name,
          content: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!value) {
      setCurrentImage(null);
    }
  }, [value, setCurrentImage]);

  return (
    <Section onDrop={handleDrop} onDragOver={handleDragOver}>
      {currentImage ? (
        <Section>
          <Image src={currentImage.content as string} />
        </Section>
      ) : (
        <Section>
          <p>Arrastra y suelta una imagen aquí</p>
          <Button onClick={() => fileInputRef?.current?.click?.()}>
            Subir imagen
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleDrop}
          />
        </Section>
      )}
    </Section>
  );
};
