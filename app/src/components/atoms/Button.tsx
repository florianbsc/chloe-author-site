import Link from "next/link";
import { cn } from "@/app/src/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "third";
  size?: "sm" | "md" | "lg" | "icon";
  href?: string;
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius)] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50";

  const sizes = {
    sm: "px-3 py-1.5 text-sm2-custom",
    md: "px-4 py-2 text-sm-custom",
    lg: "px-5 py-2.5 text-base-custom",
    icon: "h-10 w-10 p-0 text-sm2-custom",
  };

  const variants = {
    primary: "bg-brand text-white border border-brand hover:bg-brand-hover",
    secondary:
      "bg-surface-strong text-ink border border-border-strong hover:bg-surface-strong/80",
    third: "bg-transparent text-ink border border-border-medium hover:bg-ink/5",
  };

  const styles = cn(base, sizes[size], variants[variant], className || "");

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
