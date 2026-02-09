import PreviewClient from '../../preview/[id]/PreviewClient';
import { DEMO_ROUTES, DEMO_WORKFLOW_ID } from '@/lib/demoRoutes';

export default function DemoPreviewPage() {
  return (
    <PreviewClient
      params={Promise.resolve({ id: DEMO_WORKFLOW_ID })}
      editorPath={DEMO_ROUTES.editor}
    />
  );
}
