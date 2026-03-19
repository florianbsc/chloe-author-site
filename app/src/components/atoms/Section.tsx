type Props = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Section({
  title,
  subtitle,
  children,
  className = "",
}: Props) {
  return (
    <section className={`py-20 stack-lg ${className}`}>
      {(title || subtitle) && (
        <div className="stack-xs max-w-xl">
          {subtitle && (
            <p className="text-body text-muted">{subtitle}</p>
          )}

          {title && <h2 className="text-h2 font-heading">{title}</h2>}
        </div>
      )}

      {children}
    </section>
  );
}
