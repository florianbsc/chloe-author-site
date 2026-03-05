type Props = {
  title?: string
  subtitle?: string
  children: React.ReactNode
}

export default function Section({ title, subtitle, children }: Props) {
  return (
    <section className="py-20 space-y-10">

      {(title || subtitle) && (
        <div className="space-y-2 max-w-xl">
          {subtitle && (
            <p className="text-sm-custom text-neutral-500">
              {subtitle}
            </p>
          )}

          {title && (
            <h2 className="text-h2 font-heading">
              {title}
            </h2>
          )}
        </div>
      )}

      {children}

    </section>
  )
}