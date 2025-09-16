'use client';

import { PropertyProvider } from '@/components/PropertyContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PropertyProvider>
      {children}
    </PropertyProvider>
  );
}
