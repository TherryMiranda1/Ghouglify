import { useEffect, useRef } from "react";
import { Section, Button } from "../../ui";
import { OriginalImageType } from "../../../context/types";
import styled from "styled-components";
import { loadImage } from "../../../utils/loadImage";
import { compressImage } from "../../../utils/compressImage";
import { blobToDataUrl } from "../../../utils/blobToDataUrl";

interface Props {
  value?: OriginalImageType;
  onChange?: (e: OriginalImageType | null) => void;
  height?: number;
}

export const InputDrop = ({ onChange, value, height = 300 }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = async () => {
        const originalImageUrl = reader.result as string;

        try {
          const image = await loadImage(originalImageUrl);

          const compressedBlob = await compressImage(image);

          const compressedDataUrl = await blobToDataUrl(compressedBlob);

          onChange?.({
            title: file.name,
            content: compressedDataUrl,
          } as OriginalImageType);
        } catch (error) {
          console.error("Error al procesar la imagen:", error);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!value) {
      onChange?.(null);
      if (fileInputRef?.current?.value) {
        fileInputRef.current.value = "";
      }
    }
  }, [value, onChange]);

  return (
    <DraggingAreaStyled
      $height={height}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Section style={{ position: "relative", zIndex: 2 }}>
        <p>Arrastra y suelta una imagen aquí</p>
        <Button onClick={() => fileInputRef?.current?.click?.()}>
          Subir imagen
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileInputChange}
        />
      </Section>
    </DraggingAreaStyled>
  );
};

const DraggingAreaStyled = styled.section<{ $height: number }>`
  position: relative;
  border-radius: var(--card-radius);
  border: 2px dashed var(--text-color);
  transition: border 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  height: ${(props) => props.$height}px;
`;
