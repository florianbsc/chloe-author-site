import Link from "next/link";
import { cn } from "@/app/src/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-4 py-2 rounded-xl font-medium transition duration-200";


  const variants = {
  primary: "bg-primary-500 text-white hover:bg-primary-600",
  secondary: "bg-neutral-100 text-neutral-900 border border-neutral-300 hover:bg-neutral-200",
};

  const styles = cn(base, variants[variant], className || "");

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