import { useState, useEffect } from 'react';
import prepareHTML from "@/app/utils/prepareHTML";

const usePageFetch = (
    nid: string
): { data: DocItem | null; loading: boolean; error: string | null } => {
    const [data, setData] = useState<DocItem | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const urlParams = new URLSearchParams();
        urlParams.append('nid', nid);
        const DOC_LIST_URL = '/api/document';
        const fetcher = async (urlParams: URLSearchParams) => {
            const data = await fetch(`${DOC_LIST_URL}?${urlParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await data.json();
        };
        fetcher(urlParams)
            .then((fetchedData: any) => {
                const pageData: DocItem = {
                    nid: fetchedData.data.list[0].nid,
                    url: fetchedData.data.list[0].url,
                    title: fetchedData.data.list[0].title,
                    body: {
                        value: prepareHTML(fetchedData.data.list[0].body.value),
                    },
                };
                setData(pageData);
            })
            .catch((error: Error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [nid]);

    return { data, loading, error };
};

export default usePageFetch;
