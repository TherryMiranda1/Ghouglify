export function sortByDate(items: any): any {
  return items.sort((a: any, b: any) => {
    const dateA = new Date(a?.createdAt).getTime();
    const dateB = new Date(b?.createdAt).getTime();
    return dateB - dateA;
  });
}
