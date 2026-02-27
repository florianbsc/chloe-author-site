
import Button from "@/app/src/components/ui/Button";

export default function NewsletterForm() {
  

  return (
    <form className="space-y-2 max-w-md">
      <input
        type="email"
        required
        placeholder="Votre email"
        value={"email@mail.com"}
        onChange={(e) => console.log(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
        <Button variant="primary">
          S&apos;inscrire
        </Button>
      </button>
      <p className="text-xs text-gray-500">
        En vous abonnant, vous acceptez notre politique de confidentialité.
      </p>
    </form>
  );
}
