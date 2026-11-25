export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  caseStudies: "/case-studies",
  insights: "/insights",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
