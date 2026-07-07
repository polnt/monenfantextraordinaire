'use client';

import { useState } from 'react';

const faqs = [
  { q: 'Comment savoir si mon enfant est autiste ?', a: "Les signes précoces peuvent apparaître dès 18 mois. Consultez votre pédiatre si vous observez des difficultés de communication, des comportements répétitifs ou un manque d'intérêt social.", color: '#0792dc', text: 'white' },
  { q: 'À quel âge commencer la prise en charge ?', a: "Plus tôt la prise en charge commence, meilleurs sont les résultats. Il est recommandé de commencer dès les premières observations de signes, même avant un diagnostic officiel.", color: '#EFD010', text: '#090943' },
  { q: "À qui s'adressent vos formations ?", a: "Nos formations s'adressent aux parents, grands-parents, professionnels de santé, enseignants, AESH et à toute personne souhaitant accompagner un enfant présentant un retard de langage, un TSA ou un trouble du neurodéveloppement. Aucun prérequis n'est nécessaire. Les contenus sont accessibles, concrets et directement applicables au quotidien.", color: '#F90021', text: 'black' },
  { q: 'Comment se déroule la formation ?', a: "La formation est accessible 100 % en ligne. Vous avancez à votre rythme grâce à des vidéos, des démonstrations concrètes, des centaines d'exercices pratiques et des supports pédagogiques téléchargeables. Vous pouvez revoir les contenus autant de fois que vous le souhaitez.", color: '#27ae60', text: 'white' },
  { q: 'Combien de temps durent les formations ?', a: "Les formations représentent entre 12 et 15 heures de contenu. Il ne s'agit pas uniquement de théorie : plus de la moitié de chaque formation est consacrée à des démonstrations, des jeux, des exercices pratiques et des mises en situation que vous pourrez reproduire facilement avec votre enfant. La théorie est là pour vous permettre de comprendre ce que vous faites, pourquoi vous le faites et comment adapter les exercices aux besoins de votre enfant.", color: '#ff7043', text: 'black' },
  { q: 'En combien de temps mon enfant va-t-il parler ?', a: "Il n'existe malheureusement pas de délai universel. Chaque enfant évolue à son propre rythme. Les progrès dépendent notamment de son niveau de développement, de la régularité des exercices et des occasions de communication que vous lui proposez au quotidien. Nos formations vous donnent toutes les clés pour créer un environnement favorable au développement du langage.", color: '#9c27b0', text: 'white' },
  { q: 'Combien de temps faut-il consacrer aux exercices ?', a: "Environ 20 minutes par jour suffisent. La régularité est bien plus importante que la durée. Quelques minutes quotidiennes auront davantage d'impact qu'une longue séance réalisée de temps en temps.", color: '#0792dc', text: 'white' },
  { q: 'Que faire si mon enfant refuse les exercices ?', a: "Ce n'est pas grave. Les formations contiennent un très grand nombre d'activités différentes. Tous les enfants n'aiment pas les mêmes jeux, c'est pourquoi vous trouverez forcément des exercices adaptés à ses centres d'intérêt. L'ensemble de la méthode Élan quotidien repose sur le jeu, le plaisir et les interactions positives. Un enfant apprend beaucoup mieux lorsqu'il s'amuse.", color: '#EFD010', text: '#090943' },
  { q: 'Mon enfant est déjà suivi par une orthophoniste. Votre formation est-elle utile ?', a: "Oui. La formation ne remplace jamais un suivi orthophonique. Elle vient le compléter en vous apprenant à stimuler le langage au quotidien, entre les séances, grâce à des activités simples, ludiques et naturelles.", color: '#27ae60', text: 'white' },
  { q: 'Mon enfant utilise déjà le PECS, le Makaton ou la Langue des Signes. Est-ce compatible ?', a: "Oui, totalement. Ces outils sont complémentaires à la méthode proposée dans la formation.", color: '#F90021', text: 'black' },
  { q: 'Quelle est la différence entre la formation seule et le forfait avec accompagnement ?', a: "La formation vous donne accès à l'ensemble des vidéos, exercices et supports. Le forfait accompagnement comprend en plus des séances personnalisées durant lesquelles je vous aide à adapter les exercices à votre enfant, à répondre à vos questions et à vous guider avec bienveillance selon vos difficultés et vos objectifs.", color: '#ff7043', text: 'black' },
  { q: 'Aurai-je accès à vie à la formation ?', a: "Oui. Une fois inscrit, vous bénéficiez d'un accès à vie. Vous pourrez revoir les vidéos autant de fois que vous le souhaitez et revenir sur les exercices au rythme des progrès de votre enfant.", color: '#9c27b0', text: 'white' },
  { q: 'Vais-je recevoir une attestation de suivi ?', a: "Oui. Une attestation de suivi vous sera remise à l'issue de chaque formation.", color: '#090943', text: 'white' },
];

export default function FaqPage(): React.JSX.Element {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ background: '#090943', padding: '64px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(7,146,220,0.2) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ display: 'block' }}>
            <path d="M0,0 C480,48 960,48 1440,0 L1440,48 L0,48Z" fill="white" />
          </svg>
        </div>
        <div className="mef-container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ color: 'white', fontFamily: 'var(--font-nunito)', fontSize: 48, fontWeight: 900, marginBottom: 12 }}>FAQ</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, maxWidth: 520 }}>
            Les questions les plus fréquentes des parents et des éducateurs.
          </p>
        </div>
      </section>
      <section style={{ background: 'white', padding: '48px 0 80px' }}>
        <div className="mef-container" style={{ maxWidth: 960 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {faqs.map((f, i) => (
              <div
                key={i}
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  background: f.color,
                  borderRadius: 22,
                  padding: '28px 32px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: open === i ? '0 16px 48px rgba(0,0,0,0.18)' : '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                  <h3 style={{ color: f.text, fontFamily: 'var(--font-nunito)', fontWeight: 700, fontSize: 17, lineHeight: 1.4 }}>{f.q}</h3>
                  <span style={{ color: f.text, fontSize: 24, flexShrink: 0, marginTop: -2 }}>{open === i ? '−' : '+'}</span>
                </div>
                {open === i && (
                  <p style={{ color: f.text, opacity: 0.85, marginTop: 18, lineHeight: 1.7, fontSize: 15 }}>{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
