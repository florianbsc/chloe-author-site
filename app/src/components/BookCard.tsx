import Image from "next/image"

type Props = {
  title: string
  description: string
  image: string
}

export default function BookCard({ title, description, image }: Props) {
  return (
    <div className="space-y-3">

      <Image
        src={image}
        alt={title}
        width={240}
        height={360}
        className="rounded-lg object-cover"
      />

      <h3 className="text-h5 font-heading">
        {title}
      </h3>

      <p className="text-sm-custom text-neutral-500">
        {description}
      </p>

    </div>
  )
}