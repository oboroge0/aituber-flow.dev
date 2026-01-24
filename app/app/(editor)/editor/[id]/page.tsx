import EditorClient from './EditorClient';

// For static export - generate demo page
export function generateStaticParams() {
  if (process.env.NEXT_PUBLIC_DEMO_MODE !== 'true') {
    return [];
  }
  return [{ id: 'demo' }];
}

// For static export compatibility
export const dynamicParams = false;

export default function EditorPage() {
  return <EditorClient />;
}
