export const navConfig = {
  main: [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/about" },
    { label: "Actualités", href: "/actualites" },
    { label: "Blogs", href: "/blogs" },
    { label: "Romans", href: "/romans" },
  ],
  footer: [
    {
      title: "Ressources",
      links: [
        { label: "Blog", href: "/blogs" },
        { label: "Livres", href: "/romans" },
      ],
    },
    {
      title: "Légal",
      links: [
        { label: "Politique de confidentialité", href: "/privacy" },
        { label: "Conditions d'utilisation", href: "/terms" },
      ],
    },
  ],
} as const;
