export const siteUrl = "https://beretesting.com";

export const siteName = "Eberechi Omeje";
export const siteTitle =
  "Eberechi Omeje | Power Platform, Azure & Full-Stack Engineer";
export const siteDescription =
  "Portfolio of Eberechi Omeje, a Power Platform engineer, Microsoft Azure solutions architect and full-stack software engineer.";

export const socialProfiles = [
  "https://linkedin.com/in/eomeje",
  "https://github.com/beretests",
  "https://dev.to/beretests",
];

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(path, siteUrl).toString();
}
