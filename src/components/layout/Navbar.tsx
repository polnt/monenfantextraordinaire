import React from "react";
import Link from "next/link";
import SecondaryDropdown from "./SecondaryDropdown";

export default function Navbar(): React.JSX.Element {
  return (
    <nav>
      <Link href="/">Accueil</Link>
      <Link href="/comprendre">Comprendre</Link>
      <Link href="/aider">Aider</Link>
      <Link href="/outils">Outils</Link>
      <Link href="/ressources">Ressources</Link>
      <Link href="/formations">Formations</Link>
      <SecondaryDropdown />
    </nav>
  );
}
