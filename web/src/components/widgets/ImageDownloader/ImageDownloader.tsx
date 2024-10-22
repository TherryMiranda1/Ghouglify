import { Button } from "../../ui";
import { useDownloadImage } from "../../../hooks/useDownloadImage";
import { IoMdDownload } from "react-icons/io";
import styled from "styled-components";

interface Props {
  imageUrl: string;
  name?: string;
}

export const ImageDownloader = ({ imageUrl, name }: Props) => {
  const { isLoading, handleDownload } = useDownloadImage();

  return (
    <DownloaderStyled
      disabled={!imageUrl || isLoading}
      onClick={() => handleDownload(imageUrl, name)}
    >
      {isLoading ? "Descargando..." : "Descargar"}
      <IoMdDownload />
    </DownloaderStyled>
  );
};

const DownloaderStyled = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
`;
