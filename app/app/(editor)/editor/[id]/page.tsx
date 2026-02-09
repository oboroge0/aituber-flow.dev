import EditorClient from './EditorClient';
import { DEMO_WORKFLOW_ID } from '@/lib/demoRoutes';

// Keep this route for non-demo environments.
// Demo export uses fixed routes under /demo/*.
export function generateStaticParams() {
  return [{ id: DEMO_WORKFLOW_ID }];
}

export default function EditorPage() {
  return <EditorClient />;
}
