import { cn } from "@/app/src/lib/utils";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "underline";
};

export default function Input({
  size = "md",
  variant = "default",
  className,
  ...props
}: InputProps) {
  const base =
    "w-full text-ink placeholder:text-ink/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

  const sizes = {
    sm: "px-3 py-2 text-body-sm",
    md: "px-4 py-2 text-body",
    lg: "px-4 py-3 text-body-lg",
  };

  const variants = {
    default: "radius-md border border-border-medium bg-surface",
    underline:
      "rounded-none border-0 border-b border-border-medium bg-transparent px-0",
  };

  return (
    <input
      className={cn(base, sizes[size], variants[variant], className || "")}
      {...props}
    />
  );
}
