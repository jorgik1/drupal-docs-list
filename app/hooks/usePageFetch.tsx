import { useState, useEffect } from 'react';
import fetchAPI from '@/app/lib/api/dataFetcher';
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

        fetchAPI(urlParams)
            .then((fetchedData: any) => {
                const pageData: DocItem = {
                    nid: fetchedData.list[0].nid,
                    url: fetchedData.list[0].url,
                    title: fetchedData.list[0].title,
                    body: {
                        value: prepareHTML(fetchedData.list[0].body.value),
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
