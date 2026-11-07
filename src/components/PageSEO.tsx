import React, { useEffect } from 'react';

interface PageSEOProps {
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article';
}

export const PageSEO: React.FC<PageSEOProps> = ({
  title,
  description,
  path,
  ogType = 'website',
}) => {
  useEffect(() => {
    const fullTitle = title.includes('Syene Solutions')
      ? title
      : `${title} | Syene Solutions — Software & AI Studio`;
    document.title = fullTitle;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          const nameMatch = selector.match(/meta\[name="([^"]+)"\]/);
          if (nameMatch) el.setAttribute('name', nameMatch[1]);
        } else if (selector.startsWith('meta[property=')) {
          const propMatch = selector.match(/meta\[property="([^"]+)"\]/);
          if (propMatch) el.setAttribute('property', propMatch[1]);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:type"]', 'content', ogType);
    setMeta('meta[property="og:image"]', 'content', '/syene-logo.png');
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', '/syene-logo.png');

    if (typeof window !== 'undefined' && window.location.origin) {
      const canonicalHref = `${window.location.origin}${path === '/' ? '' : path}`;
      let linkEl = document.querySelector('link[rel="canonical"]');
      if (!linkEl) {
        linkEl = document.createElement('link');
        linkEl.setAttribute('rel', 'canonical');
        document.head.appendChild(linkEl);
      }
      linkEl.setAttribute('href', canonicalHref);
      setMeta('meta[property="og:url"]', 'content', canonicalHref);
    }

    // Privacy-preserving, cookieless pageview analytics event
    const analyticsEnabled = import.meta.env.VITE_ANALYTICS_ENABLED !== 'false';
    if (analyticsEnabled && typeof window !== 'undefined') {
      fetch('/api/analytics/pageview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path,
          timestamp: new Date().toISOString(),
          referrer: document.referrer ? new URL(document.referrer).hostname : 'direct',
        }),
        keepalive: true,
      }).catch(() => {
        // Silent fail for non-blocking privacy analytics
      });
    }
  }, [title, description, path, ogType]);

  return null;
};
