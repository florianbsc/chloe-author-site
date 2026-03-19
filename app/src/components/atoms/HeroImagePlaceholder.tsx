export default function HeroImagePlaceholder() {
  return (
    <div className="relative h-full w-full bg-surface-placeholder-soft">
      <div className="absolute left-1/2 top-1/2 flex h-28 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-surface-placeholder-inner">
        <svg
          aria-hidden="true"
          viewBox="0 0 74 55"
          className="h-14 w-20 fill-icon-placeholder-soft"
        >
          <circle cx="16" cy="12" r="7" />
          <path d="M34.86 31.41L44.17 18.93C44.91 17.95 46.4 17.95 47.14 18.93L65.84 44.01C66.75 45.24 65.88 47 64.35 47H11.66C10.09 47 9.24 45.17 10.23 43.96L24.96 25.96C25.74 25 27.2 25.03 27.95 26.02L34.86 35.04L34.86 31.41Z" />
        </svg>
      </div>
    </div>
  );
}
