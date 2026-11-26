import type { CSSProperties } from 'react';
export const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.2 13.9c-.2.6-1.3 1.2-1.8 1.2-.5.1-1.1.1-1.8-.1-2.600-.9-4.300-3.100-4.500-3.300-.1-.2-1.100-1.500-1.100-2.800 0-1.300.7-2 .9-2.200.2-.3.5-.3.700-.3h.5c.2 0 .4 0 .6.500l.8 1.900c.1.2.1.400 0 .500l-.3.500-.4.500c-.1.100-.3.300-.1.600.2.300.8 1.300 1.700 2.100 1.100 1 2.100 1.300 2.400 1.400.3.100.5.100.6-.1l.8-1c.2-.2.4-.2.600-.1l1.800.9c.3.100.5.200.5.400.100.200.100.800-.100 1.400z"/>
  </svg>
);
export const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5.500" /><circle cx="12" cy="12" r="4.200" /><circle cx="17.300" cy="6.700" r=".6" fill="currentColor" />
  </svg>
);
export const Sparkle = ({ style }: { style?: CSSProperties }) => (
  <svg className="sp" viewBox="0 0 24 24" style={style} aria-hidden="true"><path d="M12 0c.8 6.800 3.600 10.300 12 12-8.400 1.700-11.200 5.200-12 12-.8-6.800-3.600-10.300-12-12C8.400 10.300 11.200 6.800 12 0z" fill="currentColor"/></svg>
);
