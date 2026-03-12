import Button from "@/app/src/components/ui/Button";

interface NewsletterFormProps {
  onSubmit?: (email: string) => void;
  placeholder?: string;
  className?: string;
}

export default function NewsletterForm({
  onSubmit,
  placeholder = "Votre email",
  className = "",
}: NewsletterFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    onSubmit?.(email);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-2 max-w-md ${className}`}>
      <input
        type="email"
        name="email"
        required
        placeholder={placeholder}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <button type="submit" className="w-full">
        <Button variant="primary">S&apos;inscrire</Button>
      </button>
      <p className="text-xs text-gray-500">
        En vous abonnant, vous acceptez notre politique de confidentialité.
      </p>
    </form>
  );
}
