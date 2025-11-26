interface VmatrixSectionProps {
  title: string;
  children: React.ReactNode;
}

export function VmatrixSection({ title, children }: VmatrixSectionProps) {
  return (
    <section className="bg-card p-4">
      <h2 className="mb-2 border-b pb-1 text-base font-semibold">{title}</h2>
      {children}
    </section>
  );
}
