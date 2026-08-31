import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  href?: string;
  className?: string;
  imageClassName?: string;
  showText?: boolean;
  size?: "sm" | "md";
};

export function BrandLogo({
  href = "/",
  className,
  imageClassName,
  showText = true,
  size = "md",
}: BrandLogoProps) {
  const imgSize = size === "sm" ? 36 : 44;
  const content = (
    <>
      <Image
        src="/uploads/company-logo.jpg"
        alt="Honest Beauty and Cosmetics Ltd"
        width={imgSize}
        height={imgSize}
        className={cn("rounded-full object-cover shrink-0", imageClassName)}
        priority
      />
      {showText && (
        <span className="min-w-0 leading-tight">
          <span className="block text-sm font-bold text-foreground">Honest Beauty</span>
          <span className="block text-[11px] font-semibold text-[#EC4899]">and Cosmetics Ltd</span>
        </span>
      )}
    </>
  );

  if (!href) {
    return <div className={cn("flex items-center gap-2.5", className)}>{content}</div>;
  }

  return (
    <Link href={href} className={cn("flex items-center gap-2.5", className)}>
      {content}
    </Link>
  );
}
