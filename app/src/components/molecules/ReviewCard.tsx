import { Star } from "lucide-react";

type ReviewCardProps = {
  quote: string;
  name: string;
  role?: string;
  logo?: string;
  date?: string;
  rating?: number;
};

export default function ReviewCard({
  quote,
  name,
  role,
  logo,
  date,
  rating,
}: ReviewCardProps) {
  return (
    <article className="stack-md text-center text-ink">
      {logo ? (
        <div className="text-body font-semibold">{logo}</div>
      ) : (
        <div className="text-body font-semibold">Webflow</div>
      )}

      <blockquote className="text-h4 font-semibold leading-subtitle">
        « {quote} »
      </blockquote>

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface-placeholder-strong text-icon-placeholder">
        <span className="sr-only">Avatar</span>
      </div>

      <div className="stack-xs">
        <p className="text-body font-semibold">{name}</p>
        {role && <p className="text-body-sm text-muted">{role}</p>}
        {date && <p className="text-caption text-muted">{date}</p>}
        {typeof rating === "number" && (
          <p className="inline-flex items-center justify-center gap-1 text-caption text-muted">
            <Star className="size-3.5" aria-hidden="true" />
            {rating}/5
          </p>
        )}
      </div>
    </article>
  );
}
