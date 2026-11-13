import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const posts = [
  {
    key: 'solid',
    images: Array.from({ length: 7 }, (_, index) => `/posts/SOLID-Principles/SOLID-${index + 1}.png`),
  },
  {
    key: 'triple',
    images: Array.from({ length: 5 }, (_, index) => `/posts/Triple-Constraint/TC-${index + 1}.png`),
  },
  {
    key: 'bigo',
    images: Array.from({ length: 7 }, (_, index) => `/posts/Big-O/Big-O-${index + 1}.png`),
  },
] as const;

const Brews: React.FC = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(0);
  const [slides, setSlides] = useState<number[]>(() => posts.map(() => 0));
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [wrap, setWrap] = useState<'first' | 'last' | null>(null);
  const drag = useRef<{ pointerId: number; startX: number; distance: number } | null>(null);
  const track = useRef<HTMLDivElement>(null);
  const post = posts[selected];
  const active = slides[selected];
  const title = t(`brews.posts.${post.key}.title`);

  const finishWrap = () => {
    if (!wrap || !track.current) return;
    track.current.style.transition = 'none';
    track.current.style.transform = `translateX(${-100 * (active + 1)}%)`;
    void track.current.offsetWidth;
    track.current.style.transition = '';
    setWrap(null);
  };

  useEffect(() => {
    if (!wrap) return;
    const timer = window.setTimeout(finishWrap, 1000);
    return () => window.clearTimeout(timer);
  }, [wrap, active]);

  const setSlide = (index: number, wrapTo: 'first' | 'last' | null = null) => {
    finishWrap();
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    setAnimate(!reduceMotion);
    setWrap(reduceMotion ? null : wrapTo);
    setSlides((current) => current.map((slide, postIndex) => postIndex === selected ? index : slide));
  };

  const move = (offset: number) => {
    const next = active + offset;
    const wrapTo = next < 0 ? 'last' : next >= post.images.length ? 'first' : null;
    setSlide((next + post.images.length) % post.images.length, wrapTo);
  };

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
    finishWrap();
    drag.current = { pointerId: event.pointerId, startX: event.clientX, distance: 0 };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  };

  const moveDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return;
    drag.current.distance = event.clientX - drag.current.startX;
    setDragOffset(drag.current.distance);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>, cancelled = false) => {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return;
    const distance = drag.current.distance;
    drag.current = null;
    setDragging(false);
    setDragOffset(0);
    if (!cancelled && Math.abs(distance) >= Math.min(80, event.currentTarget.clientWidth * 0.15)) {
      move(distance < 0 ? 1 : -1);
    } else {
      setAnimate(true);
    }
  };

  return (
    <div className="intro-brews-gallery bg-gray-200">
      <div className="container mx-auto px-6">
        <div className="brew-carousel" role="region" aria-roledescription={t('brews.carouselRole')} aria-label={t('brews.carouselLabel', { title })}>
          <div className="brew-carousel-copy">
            <div className="intro-brews-gallery-heading">
              <p className="intro-brews-eyebrow">{t('brews.galleryLabel')}</p>
              <h2 id="brews-section-title">{t('brews.galleryTitle')}</h2>
            </div>
            <div className="brew-selector" role="group" aria-label={t('brews.selectTopic')}>
              {posts.map((item, index) => (
                <button
                  key={item.key}
                  type="button"
                  className="brew-selector-button"
                  aria-pressed={selected === index}
                  onClick={() => {
                    finishWrap();
                    setSelected(index);
                    setDragOffset(0);
                    setDragging(false);
                    drag.current = null;
                  }}
                >
                  <span className="brew-selector-number">{String(index + 1).padStart(2, '0')}</span>
                  <span>{t(`brews.posts.${item.key}.title`)}</span>
                </button>
              ))}
            </div>
            <span className="brew-carousel-label">{t('brews.cardLabel')}</span>
            <h3 className="brew-carousel-title">{title}</h3>
            <p className="brew-carousel-description">{t(`brews.posts.${post.key}.desc`)}</p>
            <div className="brew-carousel-controls">
              <button type="button" onClick={() => move(-1)} aria-label={t('brews.previousSlide', { title })}>
                <span aria-hidden="true">←</span>
              </button>
              <span className="brew-carousel-count" aria-live="polite" aria-atomic="true">
                {t('brews.slideCount', { current: active + 1, total: post.images.length })}
              </span>
              <button type="button" onClick={() => move(1)} aria-label={t('brews.nextSlide', { title })}>
                <span aria-hidden="true">→</span>
              </button>
            </div>
            <div className="brew-carousel-progress" role="group" aria-label={t('brews.selectSlide', { title })}>
              {post.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className={index === active ? 'is-active' : ''}
                  aria-label={t('brews.goToSlide', { current: index + 1, title })}
                  aria-current={index === active ? 'true' : undefined}
                  onClick={() => setSlide(index)}
                />
              ))}
            </div>
          </div>
          <div
            className="brew-carousel-slide"
            onPointerDown={startDrag}
            onPointerMove={moveDrag}
            onPointerUp={endDrag}
            onPointerCancel={(event) => endDrag(event, true)}
          >
            <div
              key={post.key}
              ref={track}
              className={`brew-carousel-track${dragging || !animate ? ' is-instant' : ''}`}
              style={{ transform: `translateX(calc(${-100 * (wrap === 'last' ? 0 : wrap === 'first' ? post.images.length + 1 : active + 1)}% + ${dragOffset}px))` }}
              onTransitionEnd={(event) => {
                if (event.target === event.currentTarget && event.propertyName === 'transform') finishWrap();
              }}
            >
              <img src={post.images[post.images.length - 1]} alt="" aria-hidden="true" draggable={false} width="1080" height="1080" />
              {post.images.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={t('brews.slideAlt', { title, current: index + 1, total: post.images.length })}
                  aria-hidden={index !== active}
                  loading={index === active ? 'eager' : 'lazy'}
                  draggable={false}
                  width="1080"
                  height="1080"
                />
              ))}
              <img src={post.images[0]} alt="" aria-hidden="true" draggable={false} width="1080" height="1080" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brews;
