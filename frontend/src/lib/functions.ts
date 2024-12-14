"use client";

export function getRateTypeAndExperience(
  rateType: number,
  experience: number,
): { rateType: string; experience: string } {
  const rateTypeString = rateType === 0 ? "Per Hour" : "Per Order";
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
