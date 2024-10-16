export const getAspectRatio = (width?: number, height?: number) =>
  width && height ? Math.min(width / height, 1.1) : 1;
