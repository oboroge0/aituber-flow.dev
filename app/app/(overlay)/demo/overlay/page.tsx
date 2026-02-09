import { Suspense } from 'react';
import OverlayClient from '../../overlay/[id]/OverlayClient';
import { DEMO_WORKFLOW_ID } from '@/lib/demoRoutes';

export default function DemoOverlayPage() {
  return (
    <Suspense fallback={<div className="w-screen h-screen" />}>
      <OverlayClient params={Promise.resolve({ id: DEMO_WORKFLOW_ID })} />
    </Suspense>
  );
}
