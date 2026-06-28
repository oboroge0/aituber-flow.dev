import { Suspense } from 'react';
import OverlayPage from '../../overlay/[id]/client-page';
import { DEMO_WORKFLOW_ID } from '@/lib/demoRoutes';

export default function DemoOverlayPage() {
  return (
    <Suspense fallback={<div className="w-screen h-screen" />}>
      <OverlayPage forcedWorkflowId={DEMO_WORKFLOW_ID} />
    </Suspense>
  );
}
