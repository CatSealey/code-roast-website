import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Brews, { posts } from '../src/components/Brews';
import '../src/i18n';

describe('Brew carousels', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => root.render(<Brews />));
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });

  it('uses existing image files for every slide', () => {
    expect(posts.map((post) => post.images.length)).toEqual([7, 5, 7]);
    for (const post of posts) {
      for (const image of post.images) {
        expect(existsSync(join(process.cwd(), 'public', image))).toBe(true);
      }
    }
  });

  it('selects brews, navigates slides, wraps and remembers each position', () => {
    const selectors = container.querySelectorAll<HTMLButtonElement>('.brew-selector-button');
    expect(selectors).toHaveLength(3);
    expect(container.querySelectorAll('.brew-carousel')).toHaveLength(1);
    expect(container.querySelector('.brew-carousel a')).toBeNull();
    expect(container.querySelector('.brew-carousel-copy .intro-brews-gallery-heading')?.nextElementSibling?.className).toBe('brew-selector');
    expect(container.querySelector('.brew-selector')?.nextElementSibling?.className).toBe('brew-carousel-label');

    for (const [index, selector] of Array.from(selectors).entries()) {
      act(() => selector.click());
      const carousel = container.querySelector<HTMLElement>('.brew-carousel')!;
      const currentImage = () => carousel.querySelector('img[aria-hidden="false"]')!;
      const track = carousel.querySelector<HTMLElement>('.brew-carousel-track')!;
      const buttons = carousel.querySelectorAll<HTMLButtonElement>('.brew-carousel-controls button');
      expect(selector.getAttribute('aria-pressed')).toBe('true');
      expect(carousel.querySelectorAll('.brew-carousel-track img')).toHaveLength(posts[index].images.length + 2);
      expect(currentImage().getAttribute('src')).toBe(posts[index].images[0]);
      act(() => buttons[0].click());
      expect(currentImage().getAttribute('src')).toBe(posts[index].images[posts[index].images.length - 1]);
      expect(carousel.querySelector('[aria-live]')?.textContent)
        .toBe(`${posts[index].images.length} / ${posts[index].images.length}`);
      expect(track.style.transform).toBe('translateX(calc(0% + 0px))');
      const transition = new Event('transitionend', { bubbles: true });
      Object.defineProperty(transition, 'propertyName', { value: 'transform' });
      act(() => track.dispatchEvent(transition));
      act(() => buttons[1].click());
      expect(currentImage().getAttribute('src')).toBe(posts[index].images[0]);
      expect(track.style.transform).toBe(`translateX(calc(-${(posts[index].images.length + 1) * 100}% + 0px))`);
      act(() => track.dispatchEvent(transition));
      act(() => carousel.querySelectorAll<HTMLButtonElement>('.brew-carousel-progress button')[1].click());
      expect(currentImage().getAttribute('src')).toBe(posts[index].images[1]);
      expect(track.style.transform).toBe('translateX(calc(-200% + 0px))');
      expect(track.classList.contains('is-instant')).toBe(false);
      expect(carousel.querySelectorAll('.brew-carousel-progress [aria-current="true"]')).toHaveLength(1);
    }

    act(() => selectors[0].click());
    expect(container.querySelector('.brew-carousel img[aria-hidden="false"]')?.getAttribute('src')).toBe(posts[0].images[1]);
    expect(selectors[0].getAttribute('aria-pressed')).toBe('true');
    expect(selectors[1].getAttribute('aria-pressed')).toBe('false');
  });

  it('drags the joined images and snaps to the next slide', () => {
    const viewport = container.querySelector<HTMLDivElement>('.brew-carousel-slide')!;
    const track = container.querySelector<HTMLElement>('.brew-carousel-track')!;
    Object.defineProperty(viewport, 'clientWidth', { value: 400 });
    viewport.setPointerCapture = vi.fn();

    const pointer = (type: string, clientX: number) => new PointerEvent(type, {
      bubbles: true,
      pointerId: 1,
      pointerType: 'touch',
      isPrimary: true,
      clientX
    });

    act(() => viewport.dispatchEvent(pointer('pointerdown', 300)));
    act(() => viewport.dispatchEvent(pointer('pointermove', 200)));
    expect(track.style.transform).toContain('-100px');
    act(() => viewport.dispatchEvent(pointer('pointerup', 200)));
    expect(container.querySelector('.brew-carousel-count')?.textContent).toBe('2 / 7');
    expect(track.style.transform).toBe('translateX(calc(-200% + 0px))');

    act(() => viewport.dispatchEvent(pointer('pointerdown', 200)));
    act(() => viewport.dispatchEvent(pointer('pointermove', 100)));
    act(() => viewport.dispatchEvent(pointer('pointercancel', 100)));
    expect(container.querySelector('.brew-carousel-count')?.textContent).toBe('2 / 7');
    expect(track.style.transform).toBe('translateX(calc(-200% + 0px))');
  });

  it('animates arrow navigation after a distant slide selection', () => {
    const track = container.querySelector<HTMLElement>('.brew-carousel-track')!;
    const next = container.querySelectorAll<HTMLButtonElement>('.brew-carousel-controls button')[1];
    act(() => container.querySelectorAll<HTMLButtonElement>('.brew-carousel-progress button')[4].click());
    act(() => next.click());
    expect(container.querySelector('.brew-carousel-count')?.textContent).toBe('6 / 7');
    expect(track.style.transform).toBe('translateX(calc(-600% + 0px))');
    expect(track.classList.contains('is-instant')).toBe(false);
  });
});
