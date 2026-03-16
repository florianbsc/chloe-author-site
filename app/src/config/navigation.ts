export const navConfig = {
  main: [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/about" },
    { label: "Actualités", href: "/actualites" },
    { label: "articles", href: "/articles" },
    { label: "Romans", href: "/romans" },
  ],
  footer: [
    {
      title: "Ressources",
      links: [
        { label: "Articles", href: "/articles" },
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
