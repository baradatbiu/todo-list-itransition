import { getLocalDateString } from "../dateFormatter";

describe("dateFormatter.ts", () => {
  it("return defult local date string", () => {
    const date = new Date();
    const timeStampMs = date.getTime();
    const localDateString = date.toLocaleString();

    expect(getLocalDateString(timeStampMs)).toBe(localDateString);
  });

  it("throws error if pass wrong format time stamp", () => {
    const wrongTimeStamp = 0;

    function wrongGetLocalDateString() {
      getLocalDateString(wrongTimeStamp);
    }

    expect(wrongGetLocalDateString).toThrow();
  });
});
