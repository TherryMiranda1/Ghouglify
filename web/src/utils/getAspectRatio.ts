export const getAspectRatio = (width?: number, height?: number) =>
    width && height ? width / height : 1;