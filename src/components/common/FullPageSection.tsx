"use client";

import { ReactNode } from 'react';

interface FullPageSectionProps {
  children: ReactNode;
  className?: string;
}

export default function FullPageSection({ children, className = '' }: FullPageSectionProps) {
  return (
    <section className={`full-page-section ${className}`}>
      <div className="tengri-container">
        {children}
      </div>
    </section>
  );
} 