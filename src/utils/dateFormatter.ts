export const getLocalDateString = (tmsp: number): string => {
  const date = new Date(tmsp);

  return date.toLocaleString();
};
