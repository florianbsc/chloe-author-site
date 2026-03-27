"use client";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  return (
    <section className="section-wrap-sm section-pad-md text-ink">
      <h1 className="text-h3 font-semibold leading-title">
        Une erreur est survenue
      </h1>
      <p className="mt-3 text-body leading-body-lg">
        {error.message || "Merci de réessayer dans quelques instants."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 radius-md border border-border-medium bg-surface px-4 py-2 text-body font-medium"
      >
        Réessayer
      </button>
    </section>
  );
}
