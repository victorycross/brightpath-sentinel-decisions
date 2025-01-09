interface UserNameDisplayProps {
  firstName: string | null;
  lastName: string | null;
}

export const UserNameDisplay = ({ firstName, lastName }: UserNameDisplayProps) => {
  if (!firstName && !lastName) {
    return <span className="text-muted-foreground italic">No name set</span>;
  }

  return <span>{`${firstName || ''} ${lastName || ''}`}</span>;
};