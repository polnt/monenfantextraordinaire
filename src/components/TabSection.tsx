'use client';

import { useState, useEffect } from 'react';

interface SubSection {
  title: string;
  content: string;
}

interface TabItem {
  key: string;
  desc?: string;
  color: string;
  text: string;
  sections?: SubSection[];
}

interface Tab {
  id: string;
  label: string;
  image?: string;
  imgPosition?: string;
}

interface TabSectionProps {
  tabs: Tab[];
  content: Record<string, TabItem[]>;
  accentColor?: string;
}

function SubAccordion({
  sections,
  accentColor,
}: {
  sections: SubSection[];
  accentColor: string;
}): React.JSX.Element {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {sections.map((s, i) => (
        <div
          key={i}
          style={{ border: '0.5px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%',
              background: open === i ? '#fafbff' : 'white',
              border: 'none',
              padding: '13px 18px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
              transition: 'background 0.15s',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-nunito)',
                fontWeight: 700,
                fontSize: 13,
                color: '#090943',
                textAlign: 'left',
              }}
            >
              {s.title}
            </span>
            <span
              style={{
                fontSize: 16,
                color: accentColor,
                fontWeight: 400,
                flexShrink: 0,
                display: 'inline-block',
                transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: 'transform 220ms ease',
              }}
            >
              +
            </span>
          </button>
          <div
            style={{
              maxHeight: open === i ? 400 : 0,
              overflow: 'hidden',
              transition: 'max-height 280ms ease',
            }}
          >
            <p
              style={{
                margin: 0,
                padding: '12px 18px 14px',
                fontSize: 13,
                color: '#5a6070',
                lineHeight: 1.7,
                borderTop: '0.5px solid #e5e7eb',
              }}
            >
              {s.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TabSection({
  tabs,
  content,
  accentColor = '#0792dc',
}: TabSectionProps): React.JSX.Element {
  const [tab, setTab] = useState(tabs[0]?.id ?? '');
  const [activeIdx, setActiveIdx] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const [openMobile, setOpenMobile] = useState<number | null>(null);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    setActiveIdx(0);
    setOpenMobile(null);
  }, [tab]);

  const items: TabItem[] = content[tab] ?? [];
  const active: TabItem | undefined = items[activeIdx] ?? items[0];
  const currentTab = tabs.find((t) => t.id === tab);
  const tabImage = currentTab?.image;
  const tabImgPosition = currentTab?.imgPosition ?? 'center 30%';

  const TabsBar = () => (
    <div
      style={{
        display: 'flex',
        gap: 4,
        borderBottom: '2px solid #f3f4f6',
        marginBottom: tabImage ? 0 : 32,
        overflowX: 'auto',
      }}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => setTab(t.id)}
          style={{
            padding: '13px 22px',
            border: 'none',
            borderRadius: '12px 12px 0 0',
            fontFamily: 'var(--font-nunito)',
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s',
            background: tab === t.id ? accentColor : 'transparent',
            color: tab === t.id ? 'white' : '#5a6070',
            borderBottom: tab === t.id ? `2px solid ${accentColor}` : '2px solid transparent',
            marginBottom: -2,
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );

  if (isDesktop) {
    return (
      <>
        <TabsBar />
        {tabImage && (
          <div
            style={{
              width: '100%',
              height: 240,
              overflow: 'hidden',
              borderRadius: '0 0 20px 20px',
              marginBottom: 32,
              position: 'relative',
            }}
          >
            <img
              src={tabImage}
              alt=""
              style={{
                width: '100%',
                height: '240px',
                objectFit: 'cover',
                objectPosition: tabImgPosition,
                display: 'block',
              }}
            />
          </div>
        )}
        <div
          style={{ display: 'grid', gridTemplateColumns: '272px 1fr', gap: 24, alignItems: 'start' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                style={{
                  background: item.color,
                  border: 'none',
                  borderRadius: 14,
                  padding: '18px 22px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  outline: activeIdx === i ? '2px solid #1A73E8' : '2px solid transparent',
                  outlineOffset: 2,
                  transition: 'outline 0.15s, box-shadow 0.15s',
                  boxShadow:
                    activeIdx === i ? '0 4px 16px rgba(0,0,0,0.1)' : '0 2px 6px rgba(0,0,0,0.05)',
                }}
              >
                <span
                  style={{
                    color: item.text,
                    fontFamily: 'var(--font-nunito)',
                    fontWeight: 700,
                    fontSize: 15,
                    lineHeight: 1.3,
                  }}
                >
                  {item.key}
                </span>
                {activeIdx === i && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    style={{ flexShrink: 0 }}
                  >
                    <path
                      d="M6 4l4 4-4 4"
                      stroke={item.text}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
          {active && (
            <div
              style={{
                background: 'white',
                border: '0.5px solid #e5e7eb',
                borderRadius: 20,
                minHeight: 280,
                overflow: 'hidden',
              }}
            >
              <div
                style={{ padding: '20px 28px', display: 'flex', alignItems: 'center', gap: 12 }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: active.color,
                    display: 'inline-block',
                    flexShrink: 0,
                    boxShadow: `0 0 0 3px ${active.color}33`,
                  }}
                />
                <h3
                  style={{
                    fontFamily: 'var(--font-nunito)',
                    fontWeight: 500,
                    fontSize: 16,
                    color: '#090943',
                    margin: 0,
                  }}
                >
                  {active.key}
                </h3>
              </div>
              <div style={{ height: '0.5px', background: '#e5e7eb' }} />
              <div style={{ padding: '24px 28px' }}>
                {active.sections ? (
                  <SubAccordion sections={active.sections} accentColor={accentColor} />
                ) : (
                  <p style={{ fontSize: 14, color: '#5a6070', lineHeight: 1.7, margin: 0 }}>
                    {active.desc}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <TabsBar />
      {tabImage && (
        <div
          style={{
            width: '100%',
            height: 180,
            overflow: 'hidden',
            borderRadius: '0 0 16px 16px',
            marginBottom: 24,
          }}
        >
          <img
            src={tabImage}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 30%',
              display: 'block',
            }}
          />
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((item, i) => (
          <div key={i} style={{ borderRadius: 16, overflow: 'hidden' }}>
            <button
              onClick={() => setOpenMobile(openMobile === i ? null : i)}
              style={{
                width: '100%',
                background: item.color,
                border: 'none',
                padding: '20px 24px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span
                style={{
                  color: item.text,
                  fontFamily: 'var(--font-nunito)',
                  fontWeight: 700,
                  fontSize: 16,
                }}
              >
                {item.key}
              </span>
              <span
                style={{
                  color: item.text,
                  fontSize: 22,
                  fontWeight: 300,
                  flexShrink: 0,
                  display: 'inline-block',
                  transform: openMobile === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'transform 250ms ease',
                }}
              >
                +
              </span>
            </button>
            <div
              style={{
                maxHeight: openMobile === i ? 400 : 0,
                overflow: 'hidden',
                transition: 'max-height 300ms ease',
                background: 'white',
              }}
            >
              <p
                style={{
                  padding: '16px 24px',
                  color: '#5a6070',
                  fontSize: 14,
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
