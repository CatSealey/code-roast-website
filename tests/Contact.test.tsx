import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { expect, it, vi } from 'vitest';
import Contact from '../src/components/Contact';
import '../src/i18n';

it('offers an email draft from the contact call to action', () => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  try {
    act(() => root.render(<Contact />));
    const link = container.querySelector<HTMLAnchorElement>('a');
    expect(link?.textContent).toBe('Let’s Brew Something Great');
    const href = link?.getAttribute('href');
    expect(href?.split('?')[0]).toBe('mailto:code.roast.support@gmail.com');
    const params = new URLSearchParams(href?.split('?')[1]);
    expect(params.get('subject')).toBe("Let's brew something great");
    expect(params.get('body')).toBe(
      "Hi Code-Roast,\r\n\r\nI'd love to chat about:\r\n\r\n[Tell us a little about your project or idea]\r\n\r\nThanks,"
    );
  } finally {
    act(() => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  }
});
