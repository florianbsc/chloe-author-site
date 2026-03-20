import React from "react";

type BookPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BookPostPage({ params }: BookPostPageProps) {
  const { id } = await params;

  return (
    <section>
      <div>
        <h2 className="text-xl font-semibold">book ID: {id}</h2>
      </div>
      <h1 className="text-3xl font-bold">Détails du Post</h1>
    </section>
  );
}
