import { useQuery } from '@tanstack/react-query';
import { fetchDocument } from '../services/api';

export function useDocument(nid: string) {
  return useQuery<DocItem, Error>({
    queryKey: ['document', nid],
    queryFn: () => fetchDocument(nid),
    enabled: !!nid, // Only run the query if we have an nid
    staleTime: 5 * 60 * 1000, // Documents don't change often, cache for 5 minutes
  });
}