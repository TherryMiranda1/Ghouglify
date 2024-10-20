import Pica from "pica";

const pica = new Pica();

export const compressImage = async (
  image: HTMLImageElement,
  quality: number = 0.8,
  format: string = "image/jpeg"
): Promise<Blob> => {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;

  try {
    const result = await pica.resize(image, canvas);

    const compressedImage = await pica.toBlob(result, format, quality);

    return compressedImage;
  } catch (error) {
    console.error("Error al comprimir la imagen:", error);
    throw error;
  }
};
