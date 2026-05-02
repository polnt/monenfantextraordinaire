'use client';

import { useState, useEffect, useRef } from 'react';

interface StatBlockProps {
  target: number;
  suffix: string;
  label: string;
}

export default function StatBlock({ target, suffix, label }: StatBlockProps): React.JSX.Element {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !done.current) {
          done.current = true;
          const steps = 50;
          const dur = 1800;
          let i = 0;
          const tick = setInterval(() => {
            i++;
            setVal(Math.round(target * (i / steps)));
            if (i >= steps) clearInterval(tick);
          }, dur / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  const fmt = (n: number): string =>
    n >= 1_000_000
      ? (n / 1_000_000).toFixed(0) + ' M'
      : n >= 1000
      ? n.toLocaleString('fr-FR')
      : n.toString();

  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '20px 10px' }}>
      <div
        style={{
          fontFamily: 'var(--font-nunito)',
          fontWeight: 900,
          fontSize: 60,
          color: 'white',
          lineHeight: 1,
          letterSpacing: -2,
        }}
      >
        {fmt(val)}{suffix}
      </div>
      <div
        style={{
          color: 'rgba(255,255,255,0.75)',
          fontSize: 15,
          lineHeight: 1.4,
          maxWidth: 180,
          margin: '10px auto 0',
        }}
      >
        {label}
      </div>
    </div>
  );
}
