export const getLocalDateString = (tmsp: number): string => {
  if (tmsp <= 0) {
    throw new Error("wrong time format passed");
  }

  const date = new Date(tmsp);

  return date.toLocaleString();
};
