import EditorClient from '../../editor/[id]/EditorClient';
import { DEMO_ROUTES, DEMO_WORKFLOW_ID } from '@/lib/demoRoutes';

export default function DemoEditorPage() {
  return (
    <EditorClient
      forcedWorkflowId={DEMO_WORKFLOW_ID}
      homePath={DEMO_ROUTES.home}
      overlayPath={DEMO_ROUTES.overlay}
    />
  );
}
