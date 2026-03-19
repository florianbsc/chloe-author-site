import Image from "next/image";

type Size = "small" | "medium" | "large";

interface BookCardProps {
  title: string;
  description: string;
  image: string;
  size?: Size;
  href?: string;
  className?: string;
}

const sizeConfig = {
  small: {
    width: 40,
    height: 60,
    imageClass: "rounded-md",
    textSize: "text-body-sm",
    titleClass: "font-semibold",
  },
  medium: {
    width: 120,
    height: 180,
    imageClass: "rounded-lg",
    textSize: "text-body",
    titleClass: "font-heading text-h5",
  },
  large: {
    width: 240,
    height: 360,
    imageClass: "rounded-lg",
    textSize: "text-body",
    titleClass: "font-heading text-h5",
  },
};

export default function BookCard({
  title,
  description,
  image,
  size = "large",
  href,
  className = "",
}: BookCardProps) {
  const config = sizeConfig[size];
  const isSmall = size === "small";

  const content = isSmall ? (
    <div className={`flex items-start gap-4 ${className}`}>
      <Image
        src={image}
        alt={title}
        width={config.width}
        height={config.height}
        className={`object-cover ${config.imageClass}`}
      />
      <div>
        <h2 className={config.titleClass}>{title}</h2>
        <p className={`${config.textSize} text-muted`}>{description}</p>
      </div>
    </div>
  ) : (
      <div className={`stack-sm ${className}`}>
        <Image
          src={image}
          alt={title}
          width={config.width}
          height={config.height}
          className={`rounded-lg object-cover w-full`}
        />
        <div>
          <h3 className={config.titleClass}>{title}</h3>
          <p className={`${config.textSize} text-muted`}>{description}</p>
        </div>
      </div>
  );

  if (href) {
    return (
      <a href={href} className="block hover:opacity-80 transition-opacity">
        {content}
      </a>
    );
  }

  return content;
}
