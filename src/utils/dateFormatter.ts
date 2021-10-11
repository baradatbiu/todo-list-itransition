export const getLocalDateString = (tmsp: number): string => {
  if (typeof tmsp !== "number" || tmsp <= 0) {
    throw new Error("wrong time format passed");
  }

  const date = new Date(tmsp);

  return date.toLocaleString();
};
