import {useCallback, useEffect, useState} from "react";

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
    const DOC_LIST_URL = '/api/document';
    const fetcher = async (urlParams: URLSearchParams) => {
        const data = await fetch(`${DOC_LIST_URL}?${urlParams.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await data.json();
    }

    const getDocsData = useCallback((): void => {
        setLoading(true);
        setError(null);
        fetcher(urlParams)
            .then((data) => {
                setData(data.data);
            })
            .catch((error: Error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [urlParams]);

    useEffect(() => {
        getDocsData();
    }, [getDocsData, urlParams]);

    return { data, loading, error };
};

