import { use } from 'react';
import DocumentClient from './DocumentClient';

interface PageParams {
  params: Promise<{ nid: string }>;
}

// This is a Server Component that properly handles the Promise-based params
export default function Page({ params }: PageParams) {
  // Unwrap params (which is a Promise in Next.js 15+)
  const unwrappedParams = use(params);
  
  return <DocumentClient nid={unwrappedParams.nid} />;
}