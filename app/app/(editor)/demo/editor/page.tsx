import EditorPage from '../../editor/[id]/client-page';
import { DEMO_ROUTES, DEMO_WORKFLOW_ID } from '@/lib/demoRoutes';

export default function DemoEditorPage() {
  return (
    <EditorPage
      forcedWorkflowId={DEMO_WORKFLOW_ID}
      homePath={DEMO_ROUTES.home}
      overlayPath={DEMO_ROUTES.overlay}
    />
  );
}
