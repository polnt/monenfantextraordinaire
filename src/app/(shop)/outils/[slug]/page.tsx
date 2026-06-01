import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

// Static product data — DB integration planned once product catalog is in Prisma (see docs/DECISIONS.md)

interface Inclus {
  icon: string;
  text: string;
}

interface ContentCategory {
  label: string;
  items: string[];
}

interface PedagogieItem {
  icon: string;
  title: string;
  desc: string;
}

interface ProductData {
  title: string;
  subtitle: string;
  tagline: string;
  color: string;
  colorLight: string;
  price: string;
  badge: string;
  description: string;
  img: string | null;
  imgWidth?: number;
  imgHeight?: number;
  isLegumes: boolean;
  duoSlug?: string;
  duoLabel?: string;
  inclus: Inclus[];
  content: ContentCategory[];
  contentTitle?: string;
  pourQuiItems?: Inclus[];
  pourQuiNote?: React.ReactNode;
  pedagogie?: { title: string; desc: string; items: PedagogieItem[] };
  activites?: PedagogieItem[];
  productResultats?: string[];
}

const PRODUCTS: Record<string, ProductData | undefined> = {
  "legumes-photos": {
    title: "Je découvre les fruits et légumes",
    subtitle: "en photos",
    tagline: "Parce que chaque mot appris rapproche votre enfant du monde qui l'entoure.",
    color: "#0792dc",
    colorLight: "#e8f4fd",
    price: "14,90 €",
    badge: "📷 Version Photos",
    description:
      "Un outil pédagogique conçu pour aider votre enfant à nommer, reconnaître et généraliser les fruits et légumes grâce à des photographies du monde réel.",
    img: "/uploads/miniature_outils_legumes_photo.png",
    imgWidth: 800,
    imgHeight: 1067,
    isLegumes: true,
    duoSlug: "legumes-illustrations",
    duoLabel: "Voir la version illustrations →",
    inclus: [
      { icon: "📄", text: "24 fiches en haute définition" },
      { icon: "🖨️", text: "Format PDF imprimable — A4 et cartes individuelles" },
      { icon: "♾️", text: "Accès illimité — imprimez autant de fois que nécessaire" },
      { icon: "⚡", text: "Téléchargement immédiat après paiement" },
      { icon: "🎨", text: "Photos réelles haute résolution" },
      { icon: "📋", text: "Guide d'utilisation et idées d'activités inclus" },
    ],
    content: [
      {
        label: "🍎 Fruits",
        items: ["Pomme verte", "Pomme rouge", "Banane", "Orange", "Clémentine", "Citron", "Fraise", "Melon", "Pastèque", "Papaye", "Mangue", "Ananas"],
      },
      {
        label: "🥕 Légumes",
        items: ["Carotte", "Tomate", "Brocoli", "Courgette", "Poivron rouge", "Poivron jaune", "Poivron vert", "Cerise", "Champignon", "Salade", "Haricots verts", "Oignon"],
      },
    ],
  },

  "legumes-illustrations": {
    title: "Je découvre les fruits et légumes",
    subtitle: "en illustrations",
    tagline: "Parce que chaque mot appris rapproche votre enfant du monde qui l'entoure.",
    color: "#27ae60",
    colorLight: "#e8f5e9",
    price: "14,90 €",
    badge: "🎨 Version Illustrations",
    description:
      "Un outil pédagogique qui permet à votre enfant de comprendre qu'une illustration et une photo représentent le même objet — une compétence clé pour le développement du langage.",
    img: "/uploads/miniature_outils_legume_illustration.png",
    imgWidth: 800,
    imgHeight: 1067,
    isLegumes: true,
    duoSlug: "legumes-photos",
    duoLabel: "Voir la version photos →",
    inclus: [
      { icon: "📄", text: "24 fiches en haute définition" },
      { icon: "🖨️", text: "Format PDF imprimable — A4 et cartes individuelles" },
      { icon: "♾️", text: "Accès illimité — imprimez autant de fois que nécessaire" },
      { icon: "⚡", text: "Téléchargement immédiat après paiement" },
      { icon: "🎨", text: "Illustrations colorées et attractives" },
      { icon: "📋", text: "Guide d'utilisation et idées d'activités inclus" },
    ],
    content: [
      {
        label: "🍎 Fruits",
        items: ["Pomme verte", "Pomme rouge", "Banane", "Orange", "Clémentine", "Citron", "Fraise", "Melon", "Pastèque", "Papaye", "Mangue", "Ananas"],
      },
      {
        label: "🥕 Légumes",
        items: ["Carotte", "Tomate", "Brocoli", "Courgette", "Poivron rouge", "Poivron jaune", "Poivron vert", "Cerise", "Champignon", "Salade", "Haricots verts", "Oignon"],
      },
    ],
  },

  "bonhomme-dessin": {
    title: "Apprendre à dessiner",
    subtitle: "mon premier bonhomme",
    tagline: "Dessiner un bonhomme, c'est apprendre à se comprendre.",
    color: "#9333ea",
    colorLight: "#f5f3ff",
    price: "12,90 €",
    badge: "✏️ Livret Dessin",
    description:
      "Un livret progressif pour apprendre à dessiner un bonhomme étape par étape — tout en développant le schéma corporel, la motricité fine et la confiance en soi.",
    img: "/uploads/miniature_outils_bonhomme-dessin.png",
    imgWidth: 800,
    imgHeight: 1067,
    isLegumes: false,
    inclus: [
      { icon: "📄", text: "Fiches progressives en haute définition" },
      { icon: "🖨️", text: "Format PDF imprimable — A4" },
      { icon: "♾️", text: "Accès illimité — imprimez autant de fois que nécessaire" },
      { icon: "⚡", text: "Téléchargement immédiat après paiement" },
      { icon: "✂️", text: "Activités de découpage et reconstitution incluses" },
      { icon: "📋", text: "Guide d'utilisation et progression étape par étape" },
    ],
    content: [
      {
        label: "🧍 Les parties du corps",
        items: ["La tête", "Le visage", "Le corps", "Les bras", "Les mains", "Les jambes", "Les pieds", "Les détails (cheveux, yeux, bouche…)"],
      },
      {
        label: "✂️ Découpage et reconstitution",
        items: ["Assembler les parties du corps", "Reconstituer un personnage complet", "Identifier les éléments manquants", "Manipuler pour mieux mémoriser"],
      },
      {
        label: "👧👦 Fille et garçon",
        items: ["Observer les différences", "Reconnaître les vêtements", "Reproduire les détails physiques", "Dessiner sa version à soi"],
      },
    ],
    contentTitle: "Un livret progressif — apprendre à dessiner",
    pourQuiItems: [
      { icon: "🌱", text: "Votre enfant commence à dessiner mais ne sait pas encore représenter le corps humain" },
      { icon: "🧠", text: "Vous souhaitez l'aider à mieux connaître et comprendre son corps" },
      { icon: "🧩", text: "Votre enfant a un retard de développement, un TSA diagnostiqué ou des difficultés motrices" },
      { icon: "💡", text: "Vous cherchez des activités de dessin progressives à faire à la maison ou en séance" },
      { icon: "✂️", text: "Vous voulez renforcer sa motricité fine grâce au découpage et à la manipulation" },
      { icon: "🎯", text: "Vous accompagnez un enfant dans le cadre scolaire, en rééducation ou à domicile" },
    ],
    pourQuiNote: (
      <>
        👉 Cet outil est particulièrement adapté aux enfants <strong>dès 3 ans</strong>, avec{" "}
        <strong>retard de développement</strong>, avec <strong>TSA</strong>, ou présentant{" "}
        <strong>des difficultés de repérage corporel</strong> et de motricité fine.
      </>
    ),
    pedagogie: {
      title: "Pourquoi dessiner un bonhomme ?",
      desc: "Dessiner un bonhomme, ce n'est pas seulement un exercice graphique : c'est apprendre à se connaître, à organiser l'espace, et à représenter ce que l'on ressent. Pour les enfants avec TSA ou retard de développement, c'est une étape clé pour construire le schéma corporel.",
      items: [
        {
          icon: "🧍",
          title: "Un outil de schéma corporel",
          desc: "Représenter son corps sur papier aide l'enfant à mieux le comprendre et à en intégrer l'organisation — tête, tronc, membres, détails.",
        },
        {
          icon: "✏️",
          title: "Une progression pas à pas",
          desc: "Chaque étape est construite sur la précédente, pour que l'enfant avance à son rythme sans se sentir dépassé ni découragé.",
        },
        {
          icon: "✂️",
          title: "Apprendre en manipulant",
          desc: "Les activités de découpage et de reconstitution renforcent la mémorisation par le geste — l'enfant construit sa compréhension en agissant.",
        },
      ],
    },
    activites: [
      {
        icon: "🎨",
        title: "Dessiner étape par étape",
        desc: "Suivre les étapes progressives pour construire un bonhomme complet — de la tête aux pieds, avec de plus en plus de détails.",
      },
      {
        icon: "✂️",
        title: "Découper et reconstituer",
        desc: "Assembler les parties du corps découpées pour reconstituer un personnage — apprendre en manipulant, pour mieux mémoriser.",
      },
      {
        icon: "👧👦",
        title: "Différencier fille et garçon",
        desc: "Observer et reproduire les différences entre une fille et un garçon — vêtements, coiffure, détails physiques.",
      },
      {
        icon: "🧩",
        title: "Identifier les parties du corps",
        desc: "Nommer, pointer et placer les différentes parties du corps — pour construire un schéma corporel solide et précis.",
      },
    ],
    productResultats: [
      "Apprendre à dessiner un bonhomme étape par étape, de façon progressive",
      "Développer le schéma corporel et mieux connaître son corps",
      "Améliorer la motricité fine grâce au découpage et à la manipulation",
      "Différencier fille et garçon et enrichir la compréhension de l'identité",
      "Gagner en confiance et en autonomie dans les activités graphiques",
    ],
  },

  animaux: {
    title: "Je découvre les animaux",
    subtitle: "en photos et en illustrations",
    tagline: "Et si votre enfant comprenait enfin que les images représentent le monde réel ?",
    color: "#ff7043",
    colorLight: "#fff3e0",
    price: "19,90 €",
    badge: "📷🎨 Photos + Illustrations",
    description:
      "Un outil complet qui combine photos réelles et illustrations pour aider votre enfant à reconnaître et nommer les animaux, quelle que soit la représentation visuelle.",
    img: "/uploads/miniature_outils_animaux-images-photo.png",
    imgWidth: 800,
    imgHeight: 1067,
    isLegumes: false,
    inclus: [
      { icon: "📄", text: "40 fiches en haute définition" },
      { icon: "🖨️", text: "Format PDF imprimable — A4 et cartes individuelles" },
      { icon: "♾️", text: "Accès illimité — imprimez autant de fois que nécessaire" },
      { icon: "⚡", text: "Téléchargement immédiat après paiement" },
      { icon: "🎨", text: "Photos réelles + illustrations colorées" },
      { icon: "📋", text: "Guide d'utilisation et idées d'activités inclus" },
    ],
    content: [
      {
        label: "🐄 Animaux de la ferme",
        items: ["Vache", "Cheval", "Cochon", "Poule", "Mouton", "Lapin", "Canard", "Âne"],
      },
      {
        label: "🦁 Animaux sauvages",
        items: ["Lion", "Éléphant", "Girafe", "Singe", "Zèbre", "Tigre", "Ours", "Crocodile"],
      },
      {
        label: "🐶 Animaux de compagnie",
        items: ["Chien", "Chat", "Poisson", "Tortue", "Hamster", "Perroquet"],
      },
    ],
  },
};

const POUR_QUI = [
  { icon: "🌱", text: "Votre enfant apprend à nommer les choses mais reste bloqué sur une seule image" },
  { icon: "🔗", text: "Vous souhaitez l'aider à faire le lien entre l'image et la réalité" },
  { icon: "🧩", text: "Votre enfant a un retard de langage, un TSA diagnostiqué ou suspecté" },
  { icon: "💡", text: "Vous cherchez des activités simples à faire à la maison ou en séance" },
  { icon: "📚", text: "Vous voulez enrichir son vocabulaire de façon ludique et structurée" },
  { icon: "🎯", text: "Vous accompagnez un enfant dans le cadre scolaire, en rééducation ou à domicile" },
];

const POURQUOI_VARIER = [
  {
    icon: "🔓",
    title: "Il ne reste pas bloqué sur une seule image",
    desc: "Quand un enfant voit toujours la même représentation, il peut ne pas reconnaître l'objet dans un autre contexte. Varier les supports brise ce blocage.",
  },
  {
    icon: "🔗",
    title: "Il fait des liens plus facilement",
    desc: "Exposer votre enfant à différentes représentations du même mot renforce la solidité de son vocabulaire et accélère l'acquisition du langage.",
  },
  {
    icon: "🌍",
    title: "Il comprend mieux le monde autour de lui",
    desc: "La généralisation est une compétence fondamentale pour les enfants avec TSA. Ces outils entraînent spécifiquement cette capacité, de façon progressive.",
  },
];

const JEUX = [
  {
    icon: "🎯",
    title: "Jeux de Loto",
    desc: "Associer les cartes aux bonnes cases — pour travailler la reconnaissance visuelle et la concentration.",
  },
  {
    icon: "🔀",
    title: "Jeux d'Association",
    desc: "Relier la carte image à son nom ou à une autre représentation — pour consolider le vocabulaire.",
  },
  {
    icon: "✂️",
    title: "Fiches à découper",
    desc: "Des cartes individuelles à manipuler, classer, trier — pour une expérience sensorielle et kinesthésique.",
  },
  {
    icon: "📝",
    title: "Activités de vocabulaire",
    desc: "Nommer, catégoriser, décrire — des exercices graduels adaptés au niveau de l'enfant.",
  },
];

const RESULTATS = [
  "Enrichir le vocabulaire de votre enfant de façon ciblée",
  "Développer la capacité de généralisation, compétence clé pour les enfants avec TSA",
  "Favoriser les échanges et les interactions autour de supports visuels motivants",
  "Proposer des activités autonomes ou en séance, faciles à mettre en place",
  "Créer des occasions naturelles de communication et d'apprentissage au quotidien",
];

const TEMOIGNAGES = [
  {
    quote: "Mon fils reconnaissait uniquement les illustrations de ses livres. Grâce à cet outil, il pointe maintenant les vrais fruits au marché.",
    initial: "C",
    role: "Maman d'un enfant de 4 ans avec TSA",
  },
  {
    quote: "Je l'utilise en séance d'orthophonie depuis 3 mois. La progression sur la généralisation est visible et les enfants adorent le format loto.",
    initial: "M",
    role: "Orthophoniste",
  },
  {
    quote: "Simple, bien construit, et directement utilisable. Enfin un outil adapté sans être condescendant.",
    initial: "S",
    role: "Éducatrice spécialisée",
  },
];

const EN_PRATIQUE = [
  "À la maison, en jeu libre",
  "En séance d'orthophonie ou d'éducation spécialisée",
  "En classe inclusive",
  "En déplacement sur tablette",
];

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): Array<{ slug: string }> {
  return Object.keys(PRODUCTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = PRODUCTS[slug];
  if (!d) return {};
  return {
    title: `${d.title} ${d.subtitle} — Mon Enfant Extra-Ordinaire`,
    description: d.description,
  };
}

export default async function OutilDetailPage({ params }: Props): Promise<React.JSX.Element> {
  const { slug } = await params;
  const d: ProductData | undefined = PRODUCTS[slug];
  if (!d) notFound();

  const { color, colorLight } = d;

  return (
    <div style={{ paddingTop: 72 }}>

      {/* ── HERO ── */}
      <section style={{ background: "#090943", padding: "72px 0 100px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -120, width: 480, height: 480, borderRadius: "50%", background: `${color}18`, filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 40, left: -80, width: 320, height: 320, borderRadius: "50%", background: "#FDF48218", filter: "blur(50px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ display: "block" }}>
            <path d="M0,0 C480,48 960,48 1440,0 L1440,48 L0,48Z" fill="white" />
          </svg>
        </div>

        <div className="mef-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid gap-10 md:gap-16 items-center" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", maxWidth: 1100, margin: "0 auto" }}>

            {/* Left — text */}
            <div>
              <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, borderRadius: 50, padding: "5px 14px", fontSize: 13, fontFamily: "var(--font-nunito)", fontWeight: 600, background: `${color}22`, color }}>
                  🧩 Outil pédagogique
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, borderRadius: 50, padding: "5px 14px", fontSize: 13, fontFamily: "var(--font-nunito)", fontWeight: 600, background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>
                  PDF imprimable · Accès immédiat
                </span>
              </div>

              <h1 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(32px, 4vw, 48px)", color: "white", lineHeight: 1.1, marginBottom: 8 }}>
                {d.title}
              </h1>
              <p style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "clamp(20px, 2.5vw, 26px)", color, marginBottom: 24, lineHeight: 1.3 }}>
                {d.subtitle}
              </p>
              <p style={{ fontFamily: "var(--font-aleo)", fontSize: 17, color: "rgba(255,255,255,0.72)", lineHeight: 1.75, marginBottom: 36, maxWidth: 520 }}>
                {d.description}
              </p>

              <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", marginBottom: 36 }}>
                <div style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: 42, color: "white" }}>{d.price}</div>
                <div style={{ fontFamily: "var(--font-aleo)", fontSize: 14, color: "rgba(255,255,255,0.5)" }}>Téléchargement PDF immédiat</div>
              </div>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link
                  href={`/checkout?product=${slug}`}
                  className="mef-btn"
                  style={{ background: color, color: "white", fontSize: 16, padding: "14px 32px", fontWeight: 800, boxShadow: `0 8px 32px ${color}55` }}
                >
                  🔒 Télécharger maintenant
                </Link>
                <a
                  href="#tsp-contenu"
                  className="mef-btn"
                  style={{ background: "transparent", borderColor: "rgba(255,255,255,0.3)", border: "2px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.8)", fontSize: 14, padding: "14px 24px" }}
                >
                  Voir le contenu
                </a>
              </div>
            </div>

            {/* Right — product visual, desktop only */}
            <div className="hidden md:block" style={{ position: "relative" }}>
              {d.img && d.imgWidth && d.imgHeight ? (
                <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: `0 24px 80px ${color}44, 0 4px 24px rgba(0,0,0,0.3)`, transform: "rotate(1deg)" }}>
                  <Image
                    src={d.img}
                    alt={d.title}
                    width={d.imgWidth}
                    height={d.imgHeight}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              ) : (
                <div style={{
                  width: "100%", aspectRatio: "3/4", background: colorLight,
                  borderRadius: 20, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 16,
                  boxShadow: `0 24px 80px ${color}44`,
                  transform: "rotate(1deg)",
                }}>
                  <div style={{ fontSize: 72 }}>🦁</div>
                  <div style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: 20, color: "#090943", textAlign: "center", padding: "0 24px" }}>
                    Je découvre les animaux
                  </div>
                  <div style={{ fontFamily: "var(--font-aleo)", fontSize: 14, color: "#5a6070", textAlign: "center" }}>
                    en photos et en illustrations
                  </div>
                </div>
              )}
              <div style={{
                position: "absolute", top: -12, right: -12,
                background: "#FDF482", color: "#090943",
                borderRadius: 50, padding: "8px 18px",
                fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: 13,
                boxShadow: "0 4px 16px rgba(239,208,16,0.4)",
              }}>
                {d.badge}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── POUR QUI ── */}
      <section style={{ background: "white", padding: "80px 0 72px" }}>
        <div className="mef-container" style={{ maxWidth: 960 }}>
          <div className="mef-eyebrow" style={{ textAlign: "center" }}>Cet outil est fait pour vous si…</div>
          <h2 className="mef-h2" style={{ textAlign: "center", marginBottom: 48 }}>Vous reconnaissez-vous ?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: 16 }}>
            {(d.pourQuiItems ?? POUR_QUI).map((a, i) => (
              <div key={i} style={{
                display: "flex", gap: 16, alignItems: "flex-start",
                background: "#fafbff", borderRadius: 16, padding: "20px 24px",
                border: "1px solid #f0f0f8",
              }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{a.icon}</span>
                <p style={{ margin: 0, fontFamily: "var(--font-aleo)", fontSize: 15, lineHeight: 1.65, color: "#090943" }}>{a.text}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28, background: `${color}10`, borderRadius: 16, padding: "20px 28px", borderLeft: `4px solid ${color}` }}>
            <p style={{ margin: 0, fontFamily: "var(--font-aleo)", fontSize: 15, color: "#090943", lineHeight: 1.7 }}>
              {d.pourQuiNote ?? (
                <>👉 Cet outil est particulièrement adapté aux enfants <strong>avec retard de langage</strong>, avec <strong>TSA (diagnostiqué ou suspecté)</strong>, et à tous ceux qui ont besoin de supports visuels variés pour apprendre.</>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ── POURQUOI VARIER LES SUPPORTS ── */}
      <section style={{ background: "#090943", padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: `${color}0d`, filter: "blur(80px)", pointerEvents: "none" }} />
        <div className="mef-container" style={{ position: "relative", zIndex: 1, maxWidth: 1000 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="mef-eyebrow" style={{ color }}>La pédagogie derrière l&apos;outil</div>
            <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(26px, 3.5vw, 38px)", color: "white", lineHeight: 1.2, marginBottom: 16 }}>
              {d.pedagogie?.title ?? "Pourquoi varier les supports visuels ?"}
            </h2>
            <p style={{ fontFamily: "var(--font-aleo)", fontSize: 16, color: "rgba(255,255,255,0.65)", maxWidth: 640, margin: "0 auto", lineHeight: 1.75 }}>
              {d.pedagogie?.desc ?? (
                <>
                  Pour un enfant avec TSA ou retard de langage, une illustration ≠ une photo. Il peut connaître le mot « pomme » devant un dessin… et ne pas reconnaître la pomme sur le marché. C&apos;est la{" "}
                  <strong style={{ color: "white" }}>généralisation</strong> — et c&apos;est une compétence qui s&apos;entraîne.
                </>
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {(d.pedagogie?.items ?? POURQUOI_VARIER).map((item, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 20, padding: "32px 28px",
              }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{item.icon}</div>
                <div style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: 17, color: "white", marginBottom: 12, lineHeight: 1.3 }}>{item.title}</div>
                <p style={{ margin: 0, fontFamily: "var(--font-aleo)", fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, background: `${color}1a`, border: `1px solid ${color}44`, borderRadius: 16, padding: "22px 32px", textAlign: "center" }}>
            <p style={{ margin: 0, fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: 16, color: "white", lineHeight: 1.6 }}>
              ✨ Apprendre devient plus flexible… et surtout <span style={{ color }}>beaucoup plus fun !</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTENU ── */}
      <section id="tsp-contenu" style={{ background: `${color}0d`, padding: "80px 0" }}>
        <div className="mef-container" style={{ maxWidth: 1000 }}>
          <div className="mef-eyebrow">Ce que contient l&apos;outil</div>
          <h2 className="mef-h2" style={{ marginBottom: 48 }}>
            {d.contentTitle ?? (d.isLegumes ? "24 cartes — fruits et légumes" : "40+ cartes — animaux du monde entier")}
          </h2>
          <div className={`grid grid-cols-1 gap-5 md:gap-8 ${d.isLegumes ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
            {d.content.map((cat) => (
              <div key={cat.label} style={{ background: "white", borderRadius: 20, padding: "28px 32px", boxShadow: "0 4px 24px rgba(9,9,67,0.07)", border: "1px solid #f0f0f8" }}>
                <div style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: 18, color: "#090943", marginBottom: 20 }}>{cat.label}</div>
                <div className={`grid gap-2 ${d.isLegumes ? "grid-cols-2" : "grid-cols-1"}`}>
                  {cat.items.map((item) => (
                    <div key={item} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ color, fontSize: 12, flexShrink: 0 }}>●</span>
                      <span style={{ fontFamily: "var(--font-aleo)", fontSize: 14, color: "#5a6070" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48 }}>
            <div className="mef-eyebrow">Les activités incluses</div>
            <h3 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: 26, color: "#090943", marginBottom: 28 }}>
              4 types d&apos;activités à faire ensemble
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(d.activites ?? JEUX).map((j, i) => (
                <div key={i} style={{
                  background: "white", borderRadius: 18, padding: "24px 28px",
                  border: "1px solid #f0f0f8", boxShadow: "0 4px 24px rgba(9,9,67,0.06)",
                  display: "flex", gap: 20, alignItems: "flex-start",
                }}>
                  <div style={{ fontSize: 32, flexShrink: 0 }}>{j.icon}</div>
                  <div>
                    <div style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: 16, color: "#090943", marginBottom: 6 }}>{j.title}</div>
                    <p style={{ margin: 0, fontFamily: "var(--font-aleo)", fontSize: 14, color: "#5a6070", lineHeight: 1.65 }}>{j.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CE QUE VOUS RECEVEZ ── */}
      <section style={{ background: "#090943", padding: "72px 0" }}>
        <div className="mef-container" style={{ maxWidth: 860 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="mef-eyebrow" style={{ color }}>Inclus dans le téléchargement</div>
            <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: 36, color: "white", lineHeight: 1.2 }}>Ce que vous recevez</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {d.inclus.map((inc, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16, padding: "24px 20px",
                display: "flex", gap: 14, alignItems: "flex-start",
              }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{inc.icon}</span>
                <p style={{ margin: 0, fontFamily: "var(--font-aleo)", fontSize: 14, color: "rgba(255,255,255,0.82)", lineHeight: 1.65 }}>{inc.text}</p>
              </div>
            ))}
          </div>

          {d.isLegumes && d.duoSlug && (
            <div style={{
              marginTop: 32, background: "#FDF482", borderRadius: 20, padding: "28px 36px",
              display: "flex", gap: 28, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap",
            }}>
              <div>
                <div style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: 18, color: "#090943", marginBottom: 6 }}>
                  💡 Encore mieux ensemble
                </div>
                <p style={{ margin: 0, fontFamily: "var(--font-aleo)", fontSize: 14, color: "#5a6070", lineHeight: 1.65 }}>
                  Pour maximiser la généralisation, utilisez les deux versions (photos + illustrations) de pair.
                </p>
              </div>
              <Link
                href={`/outils/${d.duoSlug}`}
                className="mef-btn"
                style={{ background: "#090943", color: "white", fontWeight: 800, fontSize: 14, padding: "12px 24px", whiteSpace: "nowrap" }}
              >
                {d.duoLabel}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── RÉSULTATS ── */}
      <section style={{ background: "white", padding: "80px 0" }}>
        <div className="mef-container" style={{ maxWidth: 960 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-start">
            <div>
              <div className="mef-eyebrow">Ce que ça va changer</div>
              <h2 className="mef-h2" style={{ marginBottom: 28 }}>Grâce à cet outil, vous pourrez…</h2>
              {(d.productResultats ?? RESULTATS).map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: "50%", background: color, color: "white",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 2,
                  }}>✓</span>
                  <p style={{ margin: 0, fontFamily: "var(--font-aleo)", fontSize: 15, lineHeight: 1.65, color: "#090943" }}>{r}</p>
                </div>
              ))}
            </div>
            <div style={{ background: "#fafbff", borderRadius: 24, padding: "36px 32px", border: "1px solid #f0f0f8" }}>
              <div style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: 18, color: "#090943", marginBottom: 20 }}>🎯 En pratique</div>
              <p style={{ fontFamily: "var(--font-aleo)", fontSize: 15, color: "#5a6070", lineHeight: 1.75, marginBottom: 20 }}>
                Ces outils s&apos;utilisent en <strong style={{ color: "#090943" }}>10 à 15 minutes</strong> — pendant un repas, une séance de jeu, ou un moment de calme. Pas besoin de formation spéciale.
              </p>
              {EN_PRATIQUE.map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                  <span style={{ color, fontSize: 14 }}>→</span>
                  <span style={{ fontFamily: "var(--font-aleo)", fontSize: 14, color: "#5a6070" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section style={{ background: "#fafbff", padding: "72px 0" }}>
        <div className="mef-container" style={{ maxWidth: 1000 }}>
          <div className="mef-eyebrow" style={{ textAlign: "center" }}>Ils l&apos;utilisent déjà</div>
          <h2 className="mef-h2" style={{ textAlign: "center", marginBottom: 48 }}>Ce que disent les familles et les professionnels</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TEMOIGNAGES.map((t, i) => (
              <div key={i} className="mef-card" style={{ padding: "28px 24px" }}>
                <div style={{ fontSize: 28, color, fontFamily: "Georgia", lineHeight: 1, marginBottom: 12, opacity: 0.4 }}>&ldquo;</div>
                <p style={{ fontFamily: "var(--font-aleo)", fontSize: 15, lineHeight: 1.75, color: "#090943", margin: "0 0 20px", fontStyle: "italic" }}>{t.quote}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", background: color, color: "white",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: 14, flexShrink: 0,
                  }}>{t.initial}</div>
                  <div style={{ fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: 12, color: "#9ca3af", lineHeight: 1.4 }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ background: "#090943", padding: "80px 0 100px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: `${color}12`, filter: "blur(80px)", pointerEvents: "none" }} />
        <div className="mef-container" style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="mef-eyebrow" style={{ color }}>Téléchargement PDF</div>
            <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: 40, color: "white", marginBottom: 12 }}>Prêt à commencer ?</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, fontFamily: "var(--font-aleo)" }}>
              Accès immédiat · PDF haute résolution · Imprimable à volonté
            </p>
          </div>

          <div style={{ background: color, borderRadius: 28, padding: "44px 48px", boxShadow: `0 24px 80px ${color}40`, textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: 14, textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>
              {d.badge}
            </div>
            <div style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: 64, color: "white", lineHeight: 1, marginBottom: 6 }}>{d.price}</div>
            <div style={{ fontFamily: "var(--font-aleo)", fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 32 }}>
              paiement unique · accès illimité
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 28, marginBottom: 32 }}>
              {d.inclus.slice(0, 4).map((inc, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12, justifyContent: "center" }}>
                  <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}>✓</span>
                  <span style={{ fontFamily: "var(--font-aleo)", fontSize: 14, color: "rgba(255,255,255,0.85)" }}>{inc.text}</span>
                </div>
              ))}
            </div>
            <Link
              href={`/checkout?product=${slug}`}
              className="mef-btn"
              style={{ background: "white", color, fontSize: 17, padding: "16px 48px", fontWeight: 800, width: "100%", justifyContent: "center" }}
            >
              🔒 Télécharger maintenant — {d.price}
            </Link>
            <p style={{ margin: "16px 0 0", fontFamily: "var(--font-aleo)", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
              ✅ Satisfait ou remboursé 30 jours · Paiement sécurisé
            </p>
          </div>

          {d.isLegumes && d.duoSlug && (
            <div style={{
              marginTop: 24, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 20, padding: "28px 36px",
              display: "flex", gap: 20, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap",
            }}>
              <div>
                <div style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: 15, color: "#FDF482", marginBottom: 6 }}>
                  🎯 Pack Photos + Illustrations
                </div>
                <p style={{ margin: 0, fontFamily: "var(--font-aleo)", fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                  Les deux versions à prix réduit : 24,90 € au lieu de 29,80 €
                </p>
              </div>
              <Link
                href="/checkout?product=pack-legumes"
                className="mef-btn"
                style={{ background: "#FDF482", color: "#090943", fontWeight: 800, fontSize: 14, padding: "12px 24px", whiteSpace: "nowrap" }}
              >
                Prendre le pack →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ background: color, padding: "64px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.12) 0%, transparent 60%)" }} />
        <div className="mef-container" style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 700 }}>
          <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: 36, color: "white", marginBottom: 14, lineHeight: 1.2 }}>
            Aidez votre enfant à comprendre le monde qui l&apos;entoure
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", lineHeight: 1.75, fontFamily: "var(--font-aleo)", marginBottom: 36 }}>
            Un outil simple, prêt à l&apos;emploi, conçu par des spécialistes — pour que chaque moment du quotidien devienne une opportunité d&apos;apprendre.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link
              href={`/checkout?product=${slug}`}
              className="mef-btn"
              style={{ background: "white", color, fontSize: 16, padding: "14px 36px", fontWeight: 800 }}
            >
              🔒 Télécharger — {d.price}
            </Link>
            <Link
              href="/outils"
              className="mef-btn"
              style={{ background: "transparent", border: "2px solid rgba(255,255,255,0.5)", color: "white", fontSize: 14, padding: "14px 24px" }}
            >
              ← Retour aux outils
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
