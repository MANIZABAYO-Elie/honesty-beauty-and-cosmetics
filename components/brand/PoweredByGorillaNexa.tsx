import { cn } from "@/lib/utils";

type PoweredByGorillaNexaProps = {
  className?: string;
  variant?: "light" | "muted" | "dark";
};

export function PoweredByGorillaNexa({ className, variant = "muted" }: PoweredByGorillaNexaProps) {
  return (
    <p
      className={cn(
        "text-xs leading-relaxed",
        variant === "light" && "text-white/70",
        variant === "muted" && "text-muted-foreground",
        variant === "dark" && "text-zinc-500",
        className
      )}
    >
      Developed by{" "}
      <a
        href="https://gorillanexalabs.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-[#EC4899] underline-offset-2 hover:underline"
      >
        Gorilla Nexa Labs
      </a>
    </p>
  );
}
