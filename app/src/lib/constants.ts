// Navigation routes
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  ACTUALITES: "/actualites",
  BLOGS: "/blogs",
  ROMANS: "/romans",
} as const;

// Common sizes used in the app
export const SIZES = {
  HEADER_HEIGHT: "64px",
  FOOTER_HEIGHT: "auto",
  CONTAINER_MAX_WIDTH: "1280px",
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100,
} as const;

// Form messages
export const FORM_MESSAGES = {
  SUCCESS: "Opération réussie!",
  ERROR: "Une erreur s\\'est produite.",
  REQUIRED_FIELD: "Ce champ est requis.",
} as const;
