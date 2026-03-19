import Button from "@/app/src/components/atoms/Button";
import Input from "@/app/src/components/atoms/Input";

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
    <form onSubmit={handleSubmit} className={`stack-xs max-w-md ${className}`}>
      <Input
        type="email"
        name="email"
        required
        placeholder={placeholder}
        size="md"
      />
      <button type="submit" className="w-full">
        <Button variant="primary" size="md">
          S&apos;inscrire
        </Button>
      </button>
      <p className="text-xs text-gray-500">
        En vous abonnant, vous acceptez notre politique de confidentialité.
      </p>
    </form>
  );
}
