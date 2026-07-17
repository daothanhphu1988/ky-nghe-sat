export function PageBanner({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-primary pb-16 pt-40 sm:pb-20 sm:pt-48">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {eyebrow && (
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">{eyebrow}</span>
        )}
        <h1 className="mt-2 font-heading text-4xl text-white sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 text-white/80">{description}</p>}
      </div>
    </section>
  );
}
