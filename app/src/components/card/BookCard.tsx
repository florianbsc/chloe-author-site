import Image from "next/image";

interface BookCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  href?: string;
}

export default function BookCard({
  title,
  description,
  imageSrc = "/file.svg",
  href,
}: BookCardProps) {
  const content = (
    <div className="flex items-start gap-4">
      <Image
        src={imageSrc}
        alt={title}
        width={40}
        height={60}
        className="rounded-md object-cover"
      />
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block hover:underline">
        {content}
      </a>
    );
  }

  return content;
}
