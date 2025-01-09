import { Loader2 } from "lucide-react";

export const UserTableLoadingState = () => {
  return (
    <div className="rounded-md border bg-white dark:bg-gray-900 p-8 text-center">
      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary/70" />
      <p className="text-muted-foreground">Loading users...</p>
    </div>
  );
};