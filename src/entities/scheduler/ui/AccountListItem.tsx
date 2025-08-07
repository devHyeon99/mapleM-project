import type { Account } from "@/entities/scheduler/model";

interface AccountListItemProps {
  account: Account;
  children?: React.ReactNode;
}

export const AccountListItem = ({
  account,
  children,
}: AccountListItemProps) => {
  return (
    <div className="flex items-center justify-between rounded-md border p-3">
      <span className="font-medium">{account.name}</span>
      {children}
    </div>
  );
};
