'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'image'; src: string; alt?: string; caption?: string; width?: number | string; align?: 'left' | 'center' | 'right' };

export interface SubSection {
  title: string;
  content?: string | string[];
  blocks?: ContentBlock[];
}

export interface TabItem {
  key: string;
  desc?: string;
  list?: string[];
  blocks?: ContentBlock[];
  color: string;
  text: string;
  sections?: SubSection[];
  image?: string;
  imgPosition?: string;
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
  imageHeight?: number;
}

function renderBlocks(blocks: ContentBlock[], accentColor: string): React.JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {blocks.map((block, i) =>
        block.type === 'paragraph' ? (
          <p key={i} style={{ margin: 0, fontSize: 13, color: '#5a6070', lineHeight: 1.7 }}>
            {block.text}
          </p>
        ) : block.type === 'image' ? (
          <figure key={i} style={{ margin: 0, textAlign: block.align ?? 'center' }}>
            <Image
              src={block.src}
              alt={block.alt ?? ''}
              width={typeof block.width === 'number' ? block.width : 800}
              height={600}
              style={{
                maxWidth: '66%',
                width: block.width ?? 'auto',
                height: 'auto',
                borderRadius: 12,
                display: 'inline-block',
              }}
            />
            {block.caption && (
              <figcaption style={{ fontSize: 11, color: '#9ca3af', marginTop: 6 }}>
                {block.caption}
              </figcaption>
            )}
          </figure>
        ) : (
          <ul key={i} style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
            {block.items.map((line, li) => (
              <li key={li} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: accentColor,
                    flexShrink: 0,
                    marginTop: 7,
                    display: 'inline-block',
                  }}
                />
                <span style={{ fontSize: 13, color: '#5a6070', lineHeight: 1.7 }}>{line}</span>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
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
              maxHeight: open === i ? 600 : 0,
              overflow: 'hidden',
              transition: 'max-height 320ms ease',
            }}
          >
            <div
              style={{
                borderTop: '0.5px solid #e5e7eb',
                padding: '12px 18px 14px',
              }}
            >
              {s.blocks ? renderBlocks(s.blocks, accentColor) : Array.isArray(s.content) ? (
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {s.content.map((line, li) => (
                    <li key={li} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          background: accentColor,
                          flexShrink: 0,
                          marginTop: 7,
                          display: 'inline-block',
                        }}
                      />
                      <span style={{ fontSize: 13, color: '#5a6070', lineHeight: 1.7 }}>{line}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ margin: 0, fontSize: 13, color: '#5a6070', lineHeight: 1.7 }}>
                  {s.content}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ItemList({
  items,
  accentColor,
}: {
  items: string[];
  accentColor: string;
}): React.JSX.Element {
  return (
    <ul style={{ margin: '12px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
      {items.map((line, i) => (
        <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: accentColor,
              flexShrink: 0,
              marginTop: 7,
              display: 'inline-block',
            }}
          />
          <span style={{ fontSize: 14, color: '#5a6070', lineHeight: 1.7 }}>{line}</span>
        </li>
      ))}
    </ul>
  );
}

export default function TabSection({
  tabs,
  content,
  accentColor = '#0792dc',
  imageHeight = 240,
}: TabSectionProps): React.JSX.Element {
  const [tab, setTab] = useState(tabs[0]?.id ?? '');
  const [activeIdx, setActiveIdx] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const [openMobile, setOpenMobile] = useState<number | null>(null);
  const tabsBarRef = useRef<HTMLDivElement>(null);
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabClick = (tabId: string, idx: number): void => {
    setTab(tabId);
    const container = tabsBarRef.current;
    const clickedBtn = tabButtonRefs.current[idx];
    const firstBtn = tabButtonRefs.current[0];
    if (container && clickedBtn && firstBtn) {
      const targetScroll = clickedBtn.offsetLeft - firstBtn.offsetLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      container.scrollTo({ left: Math.min(Math.max(0, targetScroll), maxScroll), behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent): void => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return (): void => mq.removeEventListener('change', handler);
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
  // Desktop: active item drives the banner; mobile: the open accordion item does
  const currentItem = isDesktop
    ? active
    : (openMobile !== null ? items[openMobile] : items[0]);
  // Active item image takes priority over tab image; falls back to tab image if no item image
  const bannerImage = currentItem?.image ?? tabImage;
  const bannerImgPosition = currentItem?.image
    ? (currentItem.imgPosition ?? 'center 30%')
    : tabImgPosition;

  const TabsBar = (): React.JSX.Element => (
    <div
      ref={tabsBarRef}
      style={{
        display: 'flex',
        gap: 4,
        borderBottom: '2px solid #f3f4f6',
        marginBottom: bannerImage ? 0 : 32,
        overflowX: 'auto',
        overflowY: 'hidden',
      }}
    >
      {tabs.map((t, idx) => (
        <button
          ref={(el) => { tabButtonRefs.current[idx] = el; }}
          key={t.id}
          onClick={() => handleTabClick(t.id, idx)}
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
        {TabsBar()}
        {bannerImage && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: imageHeight,
              marginTop: 16,
              marginBottom: 32,
            }}
          >
            <Image
              src={bannerImage}
              alt=""
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              style={{
                objectFit: 'contain',
                borderRadius: 20,
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
                ) : active.blocks ? (
                  renderBlocks(active.blocks, accentColor)
                ) : (
                  <>
                    {active.desc && (
                      <p style={{ fontSize: 14, color: '#5a6070', lineHeight: 1.7, margin: 0 }}>
                        {active.desc}
                      </p>
                    )}
                    {active.list && <ItemList items={active.list} accentColor={accentColor} />}
                  </>
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
      {TabsBar()}
      {bannerImage && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: Math.round(imageHeight * 0.75),
            overflow: 'hidden',
            borderRadius: 20,
            marginTop: 12,
            marginBottom: 24,
          }}
        >
          <Image
            src={bannerImage}
            alt=""
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: bannerImgPosition,
              borderRadius: 20,
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
                maxHeight: openMobile === i ? (item.sections ? 2000 : item.list ? 800 : 400) : 0,
                overflow: 'hidden',
                transition: 'max-height 350ms ease',
                background: 'white',
              }}
            >
              {item.sections ? (
                <div style={{ padding: '12px 16px' }}>
                  <SubAccordion sections={item.sections} accentColor={accentColor} />
                </div>
              ) : item.blocks ? (
                <div style={{ padding: '16px 24px' }}>
                  {renderBlocks(item.blocks, accentColor)}
                </div>
              ) : (
                <div style={{ padding: '16px 24px' }}>
                  {item.desc && (
                    <p style={{ color: '#5a6070', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                      {item.desc}
                    </p>
                  )}
                  {item.list && <ItemList items={item.list} accentColor={accentColor} />}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
