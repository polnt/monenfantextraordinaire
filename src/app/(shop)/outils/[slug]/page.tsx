import React from "react";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function OutilDetailPage({ params }: Props): Promise<React.JSX.Element> {
  const { slug } = await params;
  return <div>Outil: {slug}</div>;
}
