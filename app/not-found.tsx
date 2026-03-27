import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-wrap-sm section-pad-md text-ink">
      <h1 className="text-h2 font-bold leading-tight tracking-title">
        Page introuvable
      </h1>
      <p className="mt-4 text-body leading-body-lg">
        Cette ressource n&apos;est pas disponible ou a été déplacée.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex radius-md border border-border-medium bg-surface px-4 py-2 text-body font-medium"
      >
        Retour à l&apos;accueil
      </Link>
    </section>
  );
}
