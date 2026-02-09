import { Suspense } from 'react';
import OverlayClient from './OverlayClient';
import { DEMO_WORKFLOW_ID } from '@/lib/demoRoutes';

// Keep this route for non-demo environments.
// Demo export uses fixed routes under /demo/*.
export function generateStaticParams() {
  return [{ id: DEMO_WORKFLOW_ID }];
}

interface OverlayPageProps {
  params: Promise<{ id: string }>;
}

export default function OverlayPage({ params }: OverlayPageProps) {
  return (
    <Suspense fallback={<div className="w-screen h-screen" />}>
      <OverlayClient params={params} />
    </Suspense>
  );
}
