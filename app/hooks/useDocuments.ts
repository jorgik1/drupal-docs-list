import { useQuery } from '@tanstack/react-query';
import { fetchDocuments } from '../services/api';

export function useDocuments(type: string, page: number = 0, category: number | null = null) {
  return useQuery<DocsData, Error>({
    queryKey: ['documents', type, page, category],
    queryFn: () => fetchDocuments(type, page, category),
  });
}