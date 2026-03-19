import { cn } from "@/app/src/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "solid" | "outline";
  size?: "sm" | "md";
  className?: string;
};

export default function Badge({
  children,
  variant = "outline",
  size = "sm",
  className,
}: BadgeProps) {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap rounded-full border font-medium";

  const sizes = {
    sm: "px-3 py-1 text-body-sm",
    md: "px-4 py-1.5 text-body",
  };

  const variants = {
    outline: "border-border-medium text-ink bg-transparent",
    solid: "border-brand-soft bg-brand-soft text-ink",
  };

  return <span className={cn(base, sizes[size], variants[variant], className || "")}>{children}</span>;
}
