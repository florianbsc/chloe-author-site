import React from "react";

export default function BookPostPage({ params }: { params: { id: string } }) {
    return (
        <section>
            <div>
                <h2 className="text-xl font-semibold">book ID: {params.id}</h2>
            </div>
            <h1 className="text-3xl font-bold">Détails du Post</h1>
        </section>
    )
}