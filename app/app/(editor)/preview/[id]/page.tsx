import PreviewClient from './PreviewClient';
import { DEMO_WORKFLOW_ID } from '@/lib/demoRoutes';

// Keep this route for non-demo environments.
// Demo export uses fixed routes under /demo/*.
export function generateStaticParams() {
  return [{ id: DEMO_WORKFLOW_ID }];
}

interface PreviewPageProps {
  params: Promise<{ id: string }>;
}

export default function PreviewPage({ params }: PreviewPageProps) {
  return <PreviewClient params={params} />;
}
