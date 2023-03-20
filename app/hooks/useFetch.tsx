import React, {useState, useEffect, useCallback} from 'react';
import fetchAPI from '@/app/lib/api/dataFetcher';

export const requestParams = (type: string, page: number, category: number | null) => {
    const initialUrlParams = new URLSearchParams();
    initialUrlParams.append("type", type);
    initialUrlParams.append("limit", "10");
    initialUrlParams.append("direction", 'DESC');
    initialUrlParams.append("page", page.toString());

    if (category) {
        initialUrlParams.append("og_group_ref_documentation", category.toString());
    }
    initialUrlParams.append('limit', '10');
    initialUrlParams.append('page', page.toString());
    return initialUrlParams;
}


export const useFetch = (
    urlParams: URLSearchParams
): { data: DocsData; loading: boolean; error: string | null } => {
    const [data, setData] = useState<DocsData>({
        list: [],
        next: null,
        last: null,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const getDocsData = useCallback((): void => {
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

    useEffect(() => {
        getDocsData();
    }, [getDocsData]);

    return { data, loading, error };
};

