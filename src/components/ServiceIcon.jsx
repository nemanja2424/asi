export function ArrowIcon({ diagonal = false, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {diagonal ? <path d="M6 18 18 6M6 6h12v12" /> : <path d="M4 12h16m-6-6 6 6-6 6" />}
    </svg>
  );
}

export default function ServiceIcon({ slug, ...props }) {
  const paths = {
    "web-development": <><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01m-1 6-2 2 2 2m6-4 2 2-2 2" /></>,
    "social-media-management": <><rect x="3" y="3" width="13" height="13" rx="4" /><path d="M8 20h9a4 4 0 0 0 4-4V8M7 9.5l2.5 2.5L13 8" /></>,
    "content-creation": <><rect x="3" y="3" width="18" height="18" rx="4" /><path d="m10 8 6 4-6 4V8ZM7 3v3m10-3v3M7 18v3m10-3v3" /></>,
    "ai-automation": <><rect x="3" y="3" width="6" height="6" rx="2" /><rect x="15" y="15" width="6" height="6" rx="2" /><path d="M9 6h6a3 3 0 0 1 3 3v6M6 9v6a3 3 0 0 0 3 3h6m-1-7 2 1-2 1-1 2-1-2-2-1 2-1 1-2 1 2Z" /></>,
  };
  return <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[slug]}</svg>;
}
