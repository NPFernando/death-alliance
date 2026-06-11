import { navItems } from './data';
import type { PageKey } from './types';

export function routeFromHash(hash: string): PageKey {
  const normalized = hash.replace(/^#\/?/, '').trim();
  return navItems.some((item) => item.key === normalized) ? (normalized as PageKey) : 'home';
}

export function routeHref(page: PageKey) {
  return `#/${page}`;
}
