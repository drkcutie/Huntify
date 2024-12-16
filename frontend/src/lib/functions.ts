"use client";

export function getRateTypeAndExperience(
  rateType: number,
  experience: number,
): { rateType: string; experience: string } {
  const rateTypeString = rateType === 0 ? "Per Hour" : "Per Order";
  console.log("experince num: " + experience);
  const experienceString =
    experience === 0
      ? "Less Than 1 Year Experience"
      : experience === 1
        ? "1 to 3 Years Experience"
        : experience === 2
          ? "3 to 5 Years Experience"
          : "More Than 5 Years Experience";

  return { rateType: rateTypeString, experience: experienceString };
}

export function getlevenshteinDistance(a: string, b: string) {
  const matrix = Array.from({ length: a.length + 1 }, () =>
    Array.from({ length: b.length + 1 }, () => 0),
  );
  for (let i = 0; i <= a.length; i++) {
    matrix[i][0] = i;
  }
  for (let j = 0; j <= b.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
        );
      }
    }
  }
  return matrix[a.length][b.length];
}
