import { Button } from "../../ui";
import { useDownloadImage } from "../../../hooks/useDownloadImage";

interface Props {
  imageUrl: string;
  name?: string;
}

export const ImageDownloader = ({ imageUrl, name }: Props) => {
  const { isLoading, handleDownload } = useDownloadImage();

  return (
    <Button
      disabled={!imageUrl || isLoading}
      onClick={() => handleDownload(imageUrl, name)}
    >
      {isLoading ? "Descargando..." : "Descargar"}
    </Button>
  );
};
