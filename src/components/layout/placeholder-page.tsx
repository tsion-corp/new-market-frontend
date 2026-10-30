type PlaceholderPageProps = {
  title: string;
  message?: string;
};

export function PlaceholderPage({
  title,
  message = "This page is not designed yet.",
}: PlaceholderPageProps) {
  return (
    <section className="flex flex-col gap-3 rounded-panel bg-surface p-6">
      <h1 className="text-section-title font-semibold text-foreground">{title}</h1>
      <p className="text-list-heading font-semibold text-muted-foreground">{message}</p>
    </section>
  );
}
