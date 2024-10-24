export const truncateText = (text: string, maxLength = 40) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};
