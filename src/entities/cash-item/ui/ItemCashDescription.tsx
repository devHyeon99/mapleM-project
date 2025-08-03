"use client";

interface Props {
  description: string | null | undefined;
}

export const ItemCashDescription = ({ description }: Props) => {
  if (!description) {
    return null;
  }

  return <p className="mt-2 text-sm whitespace-pre-line">{description}</p>;
};
