import { useState, useEffect } from 'react';
import fetchAPI from '../lib/api/dataFetcher';
const useFetch = (
    urlParams: URLSearchParams
): { data: DocsData; loading: boolean; error: string | null } => {
    const [data, setData] = useState<DocsData>({
        list: [],
        next: null,
        last: null,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchAPI(urlParams)
            .then((data: DocsData) => {
                setData(data);
            })
            .catch((error: Error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [urlParams.toString()]);

    return { data, loading, error };
};

export default useFetch;
