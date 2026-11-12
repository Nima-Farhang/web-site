import type { ReactNode } from 'react';

export type IconName =
  'arrow' | 'github' | 'layers' | 'database' | 'code' | 'workflow' | 'spark';

const paths: Record<IconName, ReactNode> = {
  arrow: (
    <>
      <path d="M7 17 17 7M7 7h10v10" />
    </>
  ),
  github: (
    <>
      <path d="M9 19c-4 1-4-2-6-2m12 5v-4c0-1 .1-2-.5-2.5 3.2-.4 6.5-1.6 6.5-7A5.5 5.5 0 0 0 19.5 5c.1-1-.1-2-.5-3-1.4 0-3 1-4 1.5a13 13 0 0 0-6 0C8 3 6.4 2 5 2c-.4 1-.6 2-.5 3A5.5 5.5 0 0 0 3 8.5c0 5.4 3.3 6.6 6.5 7C9 16 9 17 9 18v4" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 16l10 5 10-5" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" />
    </>
  ),
  code: (
    <>
      <path d="m8 5-6 7 6 7m8-14 6 7-6 7M14 3l-4 18" />
    </>
  ),
  workflow: (
    <>
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="15" width="6" height="6" rx="1" />
      <path d="M9 6h6a3 3 0 0 1 3 3v6M6 9v9h9" />
    </>
  ),
  spark: (
    <>
      <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" />
    </>
  )
};

export function Icon({
  name,
  className = ''
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
