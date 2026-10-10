export const siteContentQuery = /* groq */ `
{
  "siteSettings": *[_type == "siteSettings" && _id == "siteSettings"][0],
  "homePage": *[_type == "homePage" && _id == "homePage"][0]{
    ...,
    featuredProjects[]->{
      ...,
      "slug": slug.current
    }
  },
  "aboutPage": *[_type == "aboutPage" && _id == "aboutPage"][0],
  "bookPage": *[_type == "bookPage" && _id == "bookPage"][0],
  "projects": *[_type == "project"] | order(order asc) {
    ...,
    "slug": slug.current
  },
  "clientLogos": *[_type == "clientLogo"] | order(order asc) {
    ...,
    "alt": coalesce(image.alt, name)
  }
}
`;
