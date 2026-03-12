export interface Book {
  id: number;
  title: string;
  description: string;
  image: string;
  author?: string;
  publishedAt?: Date;
  href?: string;
}

export interface BookCardProps {
  book: Book;
  size?: "small" | "medium" | "large";
  className?: string;
}
