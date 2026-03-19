import Link from "next/link";
import { cn } from "@/app/src/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "third" | "cta" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  type = "button",
  disabled = false,
  onClick,
  className,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 radius-md font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50";

  const sizes = {
    sm: "px-3 py-1.5 text-body-sm",
    md: "px-4 py-2 text-body",
    lg: "px-5 py-2.5 text-body-lg",
    icon: "h-10 w-10 p-0 text-body-sm",
  };

  const linkSizes = {
    sm: "text-body-sm",
    md: "text-body",
    lg: "text-body-lg",
    icon: "text-body-sm",
  };

  const variants = {
    primary: "bg-brand text-white border border-brand hover:bg-brand-hover",
    secondary:
      "bg-surface-strong text-ink border border-border-strong hover:bg-surface-strong/80",
    third: "bg-transparent text-ink border border-border-medium hover:bg-ink/5",
    cta: "bg-brand text-white border border-brand-strong shadow-sm hover:bg-brand-hover",
    ghost: "bg-transparent text-ink border border-border-subtle hover:bg-ink/5",
    link: "bg-transparent text-ink border border-transparent px-0 py-0 underline underline-offset-4 hover:text-ink/70",
  };

  const sizeStyles = variant === "link" ? linkSizes[size] : sizes[size];
  const styles = cn(base, sizeStyles, variants[variant], className || "");

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles}
    >
      {children}
    </button>
  );
}
