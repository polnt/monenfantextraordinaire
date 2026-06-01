'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useAddToCart } from '@/hooks/useAddToCart';

const formationColors: Record<string, string> = {
  'accompagner-mon-enfant-autiste': '#0792dc',
  'maitriser-la-methode-aba': '#27ae60',
  'communication-alternative-pecs-makaton': '#F90021',
};

const audience = [
  { icon: '🔇', text: "Votre enfant ne parle pas encore… ou très peu" },
  { icon: '😔', text: "Vous vous sentez parfois perdu·e, démuni·e, ou impuissant·e face à ses silences" },
  { icon: '🔑', text: "Vous cherchez des moyens simples pour l'aider au quotidien" },
  { icon: '💛', text: "Vous voulez des actions concrètes à mettre en place chez vous" },
  { icon: '🧩', text: "Votre enfant a un retard de langage ou un diagnostic (ou suspicion) de TSA" },
  { icon: '🌱', text: "Vous souhaitez comprendre comment il communique déjà, autrement" },
];

const modules = [
  {
    num: '01', emoji: '🧠',
    theme: 'Comprendre la communication non verbale',
    items: ["Observer l'évolution de votre enfant", 'Distinguer langage et parole', "Situer l'évolution de votre enfant", 'Découvrir les leviers de la communication non verbale'],
    result: "Comprendre où en est votre enfant et mieux entrer en relation avec lui",
  },
  {
    num: '02', emoji: '🌱',
    theme: 'Les fondations de la communication',
    items: ['Découvrir des jeux adaptés à la stimulation de chaque précurseur', 'Utiliser chaque moment du quotidien comme levier de développement', "Créer une routine d'une vingtaine de minutes par jour", 'Aider votre enfant à développer les compétences essentielles'],
    result: 'Savoir quoi faire chaque jour pour développer les compétences essentielles',
  },
  {
    num: '03', emoji: '🔍',
    theme: 'Les obstacles au développement du langage',
    items: ['Identifier précocement les signes de difficultés de langage', 'Comprendre les origines possibles des troubles du langage', "Mieux appréhender les spécificités de l'autisme", 'Adapter son accompagnement pour soutenir chaque enfant'],
    result: 'Ajuster vos actions pour mieux soutenir votre enfant',
  },
  {
    num: '04', emoji: '🗣️',
    theme: 'Le langage en action',
    items: ["Développer la motricité bucco-faciale en s'amusant", 'Renforcer le langage oral au quotidien', 'Éveiller la conscience des sons de manière ludique', "Favoriser l'expression et l'engagement de chaque enfant"],
    result: "Accompagner votre enfant vers ses premiers mots, de façon naturelle et engageante",
  },
];

const changes = [
  'Décrypter et développer les bases essentielles de la communication (regard, attention conjointe, imitation…)',
  'Respecter le rythme unique de votre enfant, sans pression ni comparaison',
  "Comprendre ses spécificités pour mieux vous adapter à lui, et non l'inverse",
  "Découvrir comment favoriser l'émergence des premiers mots naturellement",
  'Transformer le jeu et les moments du quotidien en véritables leviers de langage',
];

const takeaways = [
  { icon: '📘', text: 'Le Cahier des Parents (outil central de la méthode)' },
  { icon: '🎲', text: 'Une bibliothèque de jeux conçus comme de véritables exercices de développement du langage' },
  { icon: '🎬', text: 'Des vidéos courtes et ludiques avec des explications claires et accessibles' },
  { icon: '♾️', text: 'Un accès illimité à tous les modules, vidéos et exercices' },
  { icon: '🏅', text: 'Une attestation de formation' },
  { icon: '📥', text: 'Le power point détaillé de la formation à télécharger pour le consulter où que vous soyez' },
];

const testimonials = [
  { quote: "J'ai découvert que mon fils me 'parlait' sans mots depuis longtemps. Cette formation m'a appris à l'écouter autrement.", initial: 'M' },
  { quote: 'On a commencé les exercices, et petit à petit, il y a eu des regards, des échanges… ça change tout.', initial: 'S' },
  { quote: 'Enfin quelque chose de concret, sans pression, que je peux faire au quotidien.', initial: 'L' },
  { quote: 'Les modules sont clairs, bien construits, et les exercices simples à mettre en place dès le lendemain.', initial: 'A' },
];

const notThis = [
  'Un programme miracle pour « faire parler » un enfant',
  'Un protocole rigide ou culpabilisant',
  'Une formation théorique difficile à appliquer',
  'Des exercices trop techniques, inadaptés au quotidien des parents surchargés',
];

const guarantees = [
  { icon: '♾️', title: 'Accès illimité', desc: 'Tous les modules, vidéos et exercices accessibles à vie' },
  { icon: '🕐', title: 'Disponible 24h/24', desc: 'Sur mobile, tablette ou ordinateur, quand vous voulez' },
  { icon: '✅', title: 'Satisfait ou remboursé', desc: 'Garantie 30 jours — aucune question posée' },
  { icon: '💳', title: 'Paiement sécurisé', desc: 'Possibilité de payer en 2 fois' },
];

const bonuses = [
  { icon: '🎯', title: '4 séances individuelles', desc: "Avec Laurence BUGNET, psychologue spécialiste TSA (d'une valeur de 280 €), pour personnaliser la mise en place de vos actions et ajuster pour amplifier les progrès." },
  { icon: '👥', title: '1 masterclass de groupe', desc: "En direct avec d'autres parents pour partager vos expériences, poser vos questions et progresser ensemble." },
  { icon: '📲', title: 'Accès prioritaire', desc: 'Suivi par e-mail ou WhatsApp pour toutes vos questions en cours de formation.' },
];

interface PriceCardProps {
  plan: string;
  price: string;
  features: string[];
  highlighted: boolean;
  color: string;
  slug: string;
  onBuy: (slug: string) => Promise<void>;
  loading: boolean;
}

function PriceCard({ plan, price, features, highlighted, color, slug, onBuy, loading }: PriceCardProps): React.JSX.Element {
  return (
    <div style={{
      background: highlighted ? color : 'white',
      borderRadius: 24,
      padding: '36px 32px',
      boxShadow: highlighted ? `0 20px 60px ${color}40` : '0 4px 24px rgba(9,9,67,0.07)',
      border: highlighted ? 'none' : '1.5px solid #e5e7eb',
      flex: 1,
      position: 'relative',
      transform: highlighted ? 'scale(1.03)' : 'none',
    }}>
      {highlighted && (
        <div style={{
          position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
          background: '#FDF482', color: '#090943',
          borderRadius: 50, padding: '5px 18px',
          fontSize: 12, fontFamily: 'var(--font-nunito)', fontWeight: 800,
          whiteSpace: 'nowrap', boxShadow: '0 2px 12px rgba(239,208,16,0.4)',
        }}>⭐ RECOMMANDÉ</div>
      )}
      <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1.5, color: highlighted ? 'rgba(255,255,255,0.7)' : '#9ca3af', marginBottom: 10 }}>{plan}</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginBottom: 4 }}>
        <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 48, color: highlighted ? 'white' : '#090943', lineHeight: 1 }}>{price}</div>
      </div>
      <div style={{ fontFamily: 'var(--font-aleo)', fontSize: 14, color: highlighted ? 'rgba(255,255,255,0.65)' : '#9ca3af', marginBottom: 28 }}>accès à vie</div>
      <div style={{ borderTop: `1px solid ${highlighted ? 'rgba(255,255,255,0.2)' : '#f3f4f6'}`, paddingTop: 24, marginBottom: 28 }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
            <span style={{ color: highlighted ? 'rgba(255,255,255,0.9)' : color, fontSize: 15, flexShrink: 0, marginTop: 1 }}>✓</span>
            <span style={{ fontSize: 14, fontFamily: 'var(--font-aleo)', lineHeight: 1.55, color: highlighted ? 'rgba(255,255,255,0.88)' : '#5a6070' }}>{f}</span>
          </div>
        ))}
      </div>
      <button
        className="mef-btn"
        disabled={loading}
        onClick={() => void onBuy(slug)}
        style={{
          width: '100%', justifyContent: 'center', fontSize: 15, padding: '14px 24px',
          background: highlighted ? 'white' : color,
          color: highlighted ? color : 'white',
          fontWeight: 800,
          opacity: loading ? 0.7 : 1,
          cursor: loading ? 'wait' : 'pointer',
        }}
      >
        {loading ? 'Chargement…' : "S'inscrire maintenant"}
      </button>
    </div>
  );
}

export default function FormationDetailPage(): React.JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const isMobile = useIsMobile();
  const color = formationColors[slug] ?? '#0792dc';
  const { addAndCheckout, loading } = useAddToCart();

  const scrollTo = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const pill: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    background: '#f3f4f6', color: '#5a6070',
    borderRadius: 50, padding: '5px 14px',
    fontSize: 13, fontFamily: 'var(--font-nunito)', fontWeight: 600,
  };

  return (
    <div style={{ paddingTop: 72 }}>

      {/* HERO */}
      <section style={{ background: '#090943', padding: '80px 0 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -120, width: 480, height: 480, borderRadius: '50%', background: `${color}18`, filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 40, left: -80, width: 320, height: 320, borderRadius: '50%', background: '#FDF48218', filter: 'blur(50px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ display: 'block' }}>
            <path d="M0,0 C480,48 960,48 1440,0 L1440,48 L0,48Z" fill="white" />
          </svg>
        </div>
        <div className="mef-container" style={{ position: 'relative', zIndex: 1, maxWidth: 860, textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
            <span style={{ ...pill, background: `${color}22`, color }}>📚 Formation en ligne</span>
            <span style={{ ...pill, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}>4 modules · Accès à vie</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: isMobile ? 34 : 52, color: 'white', lineHeight: 1.15, marginBottom: 16 }}>
            Mon enfant ne parle pas…
          </h1>
          <p style={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: isMobile ? 18 : 24, color, marginBottom: 24, lineHeight: 1.35 }}>
            Construisez les bases de son langage en 15 minutes par jour
          </p>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, maxWidth: 660, margin: '0 auto 14px', fontFamily: 'var(--font-aleo)' }}>
            Un accompagnement guidé pour faire émerger les premiers mots — une méthode issue de <strong style={{ color: 'white' }}>15 ans d&apos;expérimentation sur le terrain</strong>, auprès d&apos;enfants avec autisme et retard de langage.
          </p>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, maxWidth: 600, margin: '0 auto 44px', fontFamily: 'var(--font-aleo)' }}>
            Des explications claires, des vidéos courtes et ludiques, et un cahier d&apos;exercices adaptés pour agir au quotidien via le plaisir partagé avec votre enfant.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <button
              className="mef-btn"
              style={{ background: color, color: 'white', fontSize: 17, padding: '16px 36px', fontWeight: 800, boxShadow: `0 8px 32px ${color}55` }}
              onClick={() => scrollTo('sp-pricing')}
            >
              Voir les formules →
            </button>
            <button
              className="mef-btn mef-btn-outline"
              style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.8)', fontSize: 15, padding: '16px 28px' }}
              onClick={() => scrollTo('sp-modules')}
            >
              Voir le programme
            </button>
          </div>
        </div>
      </section>

      {/* POUR QUI */}
      <section style={{ background: 'white', padding: '80px 0 72px' }}>
        <div className="mef-container" style={{ maxWidth: 940 }}>
          <div className="mef-eyebrow" style={{ textAlign: 'center' }}>Cette formation est faite pour vous si…</div>
          <h2 className="mef-h2" style={{ textAlign: 'center', marginBottom: 48 }}>Vous reconnaissez-vous ?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {audience.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: '#fafbff', borderRadius: 16, padding: '20px 24px', border: '1px solid #f0f0f8' }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{a.icon}</span>
                <p style={{ margin: 0, fontFamily: 'var(--font-aleo)', fontSize: 15, lineHeight: 1.65, color: '#090943' }}>{a.text}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, background: `${color}10`, borderRadius: 16, padding: '20px 28px', borderLeft: `4px solid ${color}` }}>
            <p style={{ margin: 0, fontFamily: 'var(--font-aleo)', fontSize: 15, color: '#090943', lineHeight: 1.7 }}>
              👉 Elle est particulièrement adaptée aux enfants <strong>avec retard de langage</strong> et aux enfants <strong>avec TSA (diagnostiqué ou suspecté)</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* CŒUR DE LA MÉTHODE */}
      <section style={{ background: '#090943', padding: isMobile ? '56px 0' : '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, borderRadius: '50%', background: `${color}0d`, filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div className="mef-container" style={{ position: 'relative', zIndex: 1, maxWidth: 900 }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 60, alignItems: 'center' }}>
            <div>
              <div className="mef-eyebrow" style={{ color }}>Le cœur de la méthode</div>
              <h2 style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 38, color: 'white', lineHeight: 1.2, marginBottom: 20 }}>
                Le Cahier des Parents
              </h2>
              <p style={{ fontFamily: 'var(--font-aleo)', fontSize: 16, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, marginBottom: 28 }}>
                Vous n&apos;allez pas juste &ldquo;apprendre&rdquo;. Vous allez <strong style={{ color: 'white' }}>faire</strong>. Grâce au Cahier des Parents, vous suivez un parcours progressif d&apos;exercices, pensé pour accompagner votre enfant des premiers signaux jusqu&apos;aux premiers mots.
              </p>
              {['Des exercices simples', 'Adaptés à chaque enfant', 'Intégrés dans votre quotidien'].map((t) => (
                <div key={t} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', background: color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <p style={{ margin: 0, fontFamily: 'var(--font-aleo)', fontSize: 16, color: 'rgba(255,255,255,0.8)' }}>{t}</p>
                </div>
              ))}
            </div>
            <div>
              <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: '40px 36px', textAlign: 'center' }}>
                <div style={{ fontSize: 64, marginBottom: 20 }}>📘</div>
                <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 20, color: 'white', marginBottom: 12 }}>20 minutes par jour suffisent</div>
                <p style={{ margin: 0, fontFamily: 'var(--font-aleo)', fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
                  pour créer des opportunités d&apos;interaction et construire, pas à pas, les bases solides du langage de votre enfant.
                </p>
                <div style={{ marginTop: 28, padding: '16px 24px', background: `${color}22`, borderRadius: 14, border: `1px solid ${color}44` }}>
                  <p style={{ margin: 0, fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 14, color, lineHeight: 1.6 }}>
                    🎲 + une bibliothèque de jeux conçus comme de véritables exercices de développement du langage
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CE QUE ÇA VA CHANGER */}
      <section style={{ background: `${color}0d`, padding: isMobile ? '56px 0' : '80px 0' }}>
        <div className="mef-container" style={{ maxWidth: 900 }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 60, alignItems: 'start' }}>
            <div>
              <div className="mef-eyebrow">Ce que cette formation va changer</div>
              <h2 className="mef-h2" style={{ marginBottom: 28 }}>Pas à pas, vous allez…</h2>
              {changes.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 16 }}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</span>
                  <p style={{ margin: 0, fontFamily: 'var(--font-aleo)', fontSize: 15, lineHeight: 1.65, color: '#090943' }}>{c}</p>
                </div>
              ))}
            </div>
            <div>
              <div style={{ background: 'white', borderRadius: 24, padding: '36px 32px', boxShadow: '0 4px 24px rgba(9,9,67,0.07)', border: '1px solid #f0f0f8' }}>
                <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: 18, color: '#090943', marginBottom: 20 }}>🎯 Résultat</div>
                <p style={{ fontFamily: 'var(--font-aleo)', fontSize: 16, color: '#5a6070', lineHeight: 1.75, marginBottom: 20, fontStyle: 'italic' }}>
                  Vous ne serez plus perdu·e face à ce que vous devez faire. Vous aurez des outils concrets, simples et applicables immédiatement, pour accompagner votre enfant avec justesse.
                </p>
                <div style={{ background: `${color}10`, borderRadius: 14, padding: '18px 20px' }}>
                  <p style={{ margin: 0, fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 15, color: '#090943', lineHeight: 1.6 }}>
                    ✨ 15 minutes par jour suffisent pour transformer vos interactions du quotidien en véritables leviers de communication.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section id="sp-modules" style={{ background: 'white', padding: '80px 0' }}>
        <div className="mef-container">
          <div className="mef-eyebrow">Programme</div>
          <h2 className="mef-h2" style={{ marginBottom: 48 }}>4 modules pour passer à l&apos;action</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {modules.map((mod, i) => (
              <div key={i} style={{
                background: '#fafbff', borderRadius: 20,
                padding: isMobile ? '20px 18px' : '28px 32px',
                border: '1px solid #f0f0f8',
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '64px 1fr auto',
                gap: isMobile ? 12 : 28,
                alignItems: 'start',
              }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 18, flexShrink: 0 }}>{mod.num}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: 17, color: '#090943', marginBottom: 14 }}>
                    {mod.emoji} {mod.theme}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '6px 20px' }}>
                    {mod.items.map((item, j) => (
                      <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <span style={{ color, fontSize: 13, flexShrink: 0, marginTop: 3 }}>✓</span>
                        <span style={{ fontFamily: 'var(--font-aleo)', fontSize: 13, color: '#5a6070', lineHeight: 1.55 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {!isMobile && (
                  <div style={{ background: `${color}12`, borderRadius: 14, padding: '16px 20px', borderLeft: `3px solid ${color}`, minWidth: 240, maxWidth: 280 }}>
                    <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color, marginBottom: 8 }}>👉 Bénéfice</div>
                    <p style={{ margin: 0, fontFamily: 'var(--font-aleo)', fontSize: 13, color: '#090943', lineHeight: 1.6 }}>{mod.result}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CE QUE VOUS RECEVEZ */}
      <section style={{ background: '#090943', padding: '80px 0' }}>
        <div className="mef-container" style={{ maxWidth: 860 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="mef-eyebrow" style={{ color }}>Inclus dans la formation</div>
            <h2 style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 38, color: 'white', lineHeight: 1.2 }}>
              Ce que vous recevez
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {takeaways.map((t, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 18, padding: '28px 24px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{t.icon}</span>
                <p style={{ margin: 0, fontFamily: 'var(--font-aleo)', fontSize: 15, color: 'rgba(255,255,255,0.82)', lineHeight: 1.65 }}>{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BONUS */}
      <section style={{ background: '#FDF482', padding: '72px 0' }}>
        <div className="mef-container" style={{ maxWidth: 900 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="mef-eyebrow mef-eyebrow-red">Formule accompagnée — 249 €</div>
            <h2 className="mef-h2">Les bonus exclusifs</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 20 }}>
            {bonuses.map((b, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 20, padding: '28px 24px', boxShadow: '0 4px 20px rgba(239,208,16,0.25)' }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{b.icon}</div>
                <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: 17, color: '#090943', marginBottom: 10 }}>{b.title}</div>
                <p style={{ margin: 0, fontFamily: 'var(--font-aleo)', fontSize: 14, color: '#5a6070', lineHeight: 1.65 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section style={{ background: 'white', padding: '80px 0' }}>
        <div className="mef-container">
          <div className="mef-eyebrow" style={{ textAlign: 'center' }}>Témoignages</div>
          <h2 className="mef-h2" style={{ textAlign: 'center', marginBottom: 48 }}>Ce que disent les parents</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 20 }}>
            {testimonials.map((t, i) => (
              <div key={i} className="mef-card" style={{ padding: '32px 28px' }}>
                <div style={{ fontSize: 32, color: color, fontFamily: 'Georgia', lineHeight: 1, marginBottom: 14, opacity: 0.4 }}>&ldquo;</div>
                <p style={{ fontFamily: 'var(--font-aleo)', fontSize: 16, lineHeight: 1.75, color: '#090943', margin: '0 0 24px', fontStyle: 'italic' }}>{t.quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: 16 }}>{t.initial}</div>
                  <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 14, color: '#9ca3af' }}>Parent d&apos;un enfant accompagné</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CE QUE CE N'EST PAS */}
      <section style={{ background: '#fafbff', padding: '64px 0' }}>
        <div className="mef-container" style={{ maxWidth: 800 }}>
          <h2 className="mef-h2" style={{ marginBottom: 8 }}>Ce que cette formation <span style={{ color: '#F90021' }}>n&apos;est pas</span></h2>
          <p style={{ fontFamily: 'var(--font-aleo)', fontSize: 16, color: '#5a6070', marginBottom: 32 }}>Ici, on respecte le rythme de votre enfant. On construit des interactions réelles, durables et on évolue ensemble.</p>
          {notThis.map((n, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 14, background: 'white', borderRadius: 16, padding: '18px 24px', border: '1px solid #f0f0f8' }}>
              <span style={{ color: '#F90021', fontSize: 18, fontWeight: 800, flexShrink: 0 }}>✕</span>
              <p style={{ margin: 0, fontFamily: 'var(--font-aleo)', fontSize: 15, color: '#5a6070', lineHeight: 1.65 }}>{n}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="sp-pricing" style={{ background: '#090943', padding: '80px 0 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: `${color}12`, filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div className="mef-container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="mef-eyebrow" style={{ color }}>Tarifs</div>
            <h2 style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 42, color: 'white', marginBottom: 14 }}>Choisissez votre formule</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, fontFamily: 'var(--font-aleo)' }}>Accès immédiat · 100% en ligne · Garantie satisfait ou remboursé 30 jours</p>
          </div>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 20, alignItems: 'stretch', maxWidth: 820, margin: '0 auto' }}>
            <PriceCard
              plan="En autonomie"
              price="99 €"
              highlighted={false}
              color={color}
              slug={slug}
              onBuy={addAndCheckout}
              loading={loading}
              features={[
                'Accès aux 4 modules complets',
                'Vidéos courtes et ludiques',
                'Le Cahier des Parents (outil central)',
                "Bibliothèque de jeux et d'exercices",
                'Accès à vie depuis tous vos appareils',
                'Attestation de formation',
              ]}
            />
            <PriceCard
              plan="Avec accompagnement personnalisé"
              price="249 €"
              highlighted={true}
              color={color}
              slug={`${slug}-accompagne`}
              onBuy={addAndCheckout}
              loading={loading}
              features={[
                'Tout ce qui est inclus dans la formule de base',
                '4 séances individuelles avec Laurence BUGNET, psychologue spécialiste TSA (valeur 280 €)',
                '1 masterclass de groupe en direct',
                'Accès prioritaire par e-mail ou WhatsApp',
                'Attestation de formation',
              ]}
            />
          </div>
        </div>
      </section>

      {/* GARANTIES */}
      <section style={{ background: 'white', padding: '64px 0' }}>
        <div className="mef-container">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 16 }}>
            {guarantees.map((g, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '24px 16px' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{g.icon}</div>
                <div style={{ fontFamily: 'var(--font-nunito)', fontWeight: 800, fontSize: 15, color: '#090943', marginBottom: 8 }}>{g.title}</div>
                <p style={{ margin: 0, fontFamily: 'var(--font-aleo)', fontSize: 13, color: '#9ca3af', lineHeight: 1.6 }}>{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ background: color, padding: '72px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.12) 0%, transparent 60%)' }} />
        <div className="mef-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 740 }}>
          <h2 style={{ fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 38, color: 'white', marginBottom: 16, lineHeight: 1.2 }}>
            Rejoignez la formation dès aujourd&apos;hui
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.8)', lineHeight: 1.75, fontFamily: 'var(--font-aleo)', marginBottom: 12 }}>
            Commencez à mettre en place, dès aujourd&apos;hui, des actions simples et guidées pour soutenir le développement du langage de votre enfant.
          </p>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, fontFamily: 'var(--font-aleo)', marginBottom: 40, fontStyle: 'italic' }}>
            ✨ 15 minutes par jour suffisent pour transformer vos interactions du quotidien en véritables leviers de communication et favoriser l&apos;apparition des premiers mots.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <button
              className="mef-btn"
              style={{ background: 'white', color: color, fontSize: 17, padding: '16px 40px', fontWeight: 800 }}
              onClick={() => scrollTo('sp-pricing')}
            >
              🔒 Accéder à la formation maintenant
            </button>
            <Link
              href="/formations"
              className="mef-btn"
              style={{ background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.5)', fontSize: 15, padding: '16px 28px' }}
            >
              ← Retour aux formations
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
