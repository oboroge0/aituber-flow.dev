'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { DEMO_ROUTES } from '@/lib/demoRoutes';

export default function DemoHomePage() {
  useEffect(() => {
    window.location.replace(DEMO_ROUTES.editor);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-8">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-3xl font-bold">AITuberFlow Demo</h1>
        <p className="text-slate-300">
          Loading demo editor...
        </p>
        <Link
          href={DEMO_ROUTES.editor}
          className="inline-flex items-center rounded-lg bg-emerald-600 px-5 py-2.5 font-semibold hover:bg-emerald-500 transition-colors"
        >
          Open Demo Editor
        </Link>
      </div>
    </main>
  );
}
