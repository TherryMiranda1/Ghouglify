import { useEffect, useRef } from "react";
import { Section, Button } from "../../ui";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { OriginalImageType } from "../../../context/types";
import styled from "styled-components";

interface Props {
  value?: OriginalImageType;
  onChange?: (e: OriginalImageType, isFile?: boolean) => void;
}

export const InputDrop = ({ onChange, value }: Props) => {
  const {
    sandbox: { setOriginalImage },
  } = useGlobalContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setOriginalImage({
          title: file.name,
          content: reader.result,
        });
        onChange?.({
          title: file.name,
          content: reader.result,
        } as OriginalImageType);
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
      setOriginalImage(null);
    }
  }, [value, setOriginalImage]);

  return (
    <DraggingAreaStyled onDrop={handleDrop} onDragOver={handleDragOver}>
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

const DraggingAreaStyled = styled.section`
  position: relative;
  border-radius: var(--card-radius);
  border: 2px dashed var(--text-color);
  transition: border 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  height: 400px;
`;
