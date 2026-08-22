import { Boxes } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground animate-pulse">
          <Boxes className="h-6 w-6" />
        </div>
        <div className="h-2 w-32 bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
}
