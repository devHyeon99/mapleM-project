interface Props {
  description: string | null | undefined;
}

export const ItemCashDescription = ({ description }: Props) => {
  if (!description) {
    return null;
  }

  return (
    <section className="border-divider border-b py-1 text-sm">
      <h3 className="sr-only">아이템 설명</h3>
      <p className="whitespace-pre-line">{description}</p>
    </section>
  );
};
