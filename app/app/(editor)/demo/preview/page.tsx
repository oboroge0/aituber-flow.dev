import PreviewPage from '../../preview/[id]/client-page';
import { DEMO_ROUTES, DEMO_WORKFLOW_ID } from '@/lib/demoRoutes';

export default function DemoPreviewPage() {
  return (
    <PreviewPage
      forcedWorkflowId={DEMO_WORKFLOW_ID}
      editorPath={DEMO_ROUTES.editor}
    />
  );
}
