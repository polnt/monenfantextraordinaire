'use client';

import Image from 'next/image';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function CollaborationUnique(): React.JSX.Element {
  const isMobile = useIsMobile();

  const pStyle: React.CSSProperties = { color: '#5a6070', lineHeight: 1.85, fontSize: 16, margin: 0 };

  return (
    <section style={{ background: '#eef6fd', padding: isMobile ? '48px 0' : '80px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: -90, top: -90, width: 280, height: 280, borderRadius: '50%', background: 'rgba(7,146,220,0.07)' }} />
      <div style={{ position: 'absolute', left: -70, bottom: -70, width: 220, height: 220, borderRadius: '50%', background: 'rgba(249,0,33,0.05)' }} />
      <div className="mef-container" style={{ maxWidth: 980, position: 'relative', zIndex: 1 }}>

        <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 48 }}>
          <div className="mef-eyebrow">À deux voix</div>
          <h2 className="mef-h2" style={{ fontSize: isMobile ? 28 : 36 }}>
            Une collaboration <span style={{ color: '#0792dc' }}>unique</span>, au cœur de notre approche
          </h2>
          <p style={{ fontSize: isMobile ? 16 : 17, color: '#5a6070', lineHeight: 1.8, maxWidth: 680, margin: '0 auto' }}>
            Derrière chaque formation et chaque outil proposé ici, il y a bien plus qu&apos;une méthode : il y a une véritable collaboration humaine et familiale.
          </p>
        </div>

        <div style={{ maxWidth: 740, margin: '0 auto' }}>
          {isMobile ? (
            <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
              <Image
                src="/uploads/ludivine.png"
                alt="Ludivine, ingénieure pédagogique"
                width={400}
                height={500}
                style={{ width: '100%', height: 'auto', objectFit: 'cover', objectPosition: 'center right', display: 'block' }}
              />
            </div>
          ) : (
            <Image
              src="/uploads/ludivine.png"
              alt="Ludivine, ingénieure pédagogique"
              width={290}
              height={360}
              style={{ float: 'right', marginLeft: 32, marginBottom: 16, objectFit: 'cover', objectPosition: 'center right', borderRadius: 16, display: 'block', position: 'relative', zIndex: 0, transform: 'translateX(-80px)' }}
            />
          )}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={pStyle}>
              Je travaille main dans la main avec <strong style={{ color: '#090943' }}>Ludivine, ingénieure pédagogique, qui est aussi ma fille</strong>. Ce lien particulier nourrit profondément notre manière de concevoir et de transmettre. Il apporte une écoute, une exigence et une complémentarité rares, au service d&apos;un objectif commun : rendre des connaissances expertes réellement accessibles, concrètes et utiles pour les familles.
            </p>
            <p style={{ ...pStyle, marginTop: 20 }}>
              De mon côté, j&apos;apporte mon expérience de psychologue spécialisée TSA et de directrice d&apos;école, construite au fil des années sur le terrain, au plus près des enfants et de leurs parents. Ludivine, quant à elle, possède cette expertise précieuse pour transformer ces savoirs en parcours pédagogiques clairs, structurés et engageants.
            </p>
            <p style={{ ...pStyle, marginTop: 20 }}>
              Elle m&apos;accompagne pour organiser, séquencer et rendre accessibles des contenus parfois complexes, sans jamais en perdre la richesse. Ensemble nous transformons mes expériences et mes outils en formations concrètes, faciles à suivre et adaptées à des quotidiens souvent bien remplis.
            </p>
            <p style={{ ...pStyle, marginTop: 20 }}>
              Ainsi, chacune de nos formations sont pensées à deux et co-construites en croisant nos regards : l&apos;expertise de terrain et l&apos;ingénierie pédagogique. Nous échangeons, nous testons, nous ajustons… pour proposer des contenus à la fois solides, vivants et directement applicables.
            </p>
            <p style={{ ...pStyle, marginTop: 20 }}>
              Ce travail à deux voix nous permet de créer des ressources vraiment uniques, conçues pour s&apos;intégrer dans des quotidiens souvent bien remplis, tout en restant concrètes, efficaces et faciles à s&apos;approprier.
            </p>
            <p style={{ ...pStyle, marginTop: 20 }}>
              Mais au-delà des compétences, cette <strong style={{ color: '#090943' }}>collaboration mère-fille</strong> apporte une dimension particulière à notre approche : une attention sincère aux besoins des familles, une envie profonde de transmettre avec justesse, et un vrai engagement dans la qualité de ce que nous proposons.
            </p>
          </div>
          <div style={{ clear: 'both' }} />
        </div>

        <div style={{ maxWidth: 740, margin: isMobile ? '28px auto 0' : '36px auto 0', background: 'white', borderRadius: 18, padding: isMobile ? '26px 26px' : '34px 40px', borderLeft: '5px solid #0792dc', boxShadow: '0 12px 32px rgba(9,9,67,0.07)' }}>
          <p style={{ fontFamily: 'var(--font-aleo)', fontStyle: 'italic', fontSize: isMobile ? 16 : 18, color: '#090943', lineHeight: 1.8, margin: 0 }}>
            C&apos;est cette complémentarité — entre expertise de terrain et ingénierie pédagogique — mais aussi cette alliance, à la fois professionnelle et personnelle, qui fait aujourd&apos;hui la singularité de nos accompagnements… et ce qui nous permet de vous proposer des ressources sérieuses, accessibles et pensées pour la vraie vie.
          </p>
        </div>

      </div>
    </section>
  );
}
