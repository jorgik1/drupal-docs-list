"use client";
import React, {useEffect, useState} from 'react';
import useFetch from '@/app/hooks/useFetch';
import Loading from '@/app/document/loading';
import Link from "next/link";

const DocsList: React.FC<DocsListProps> = ({ type, category }) => {
    const [page, setPage] = useState(0);
    const [lastPage, setLastPage] = useState(0);
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

    const { data, loading, error } = useFetch(initialUrlParams);

    useEffect(() => {
        if (data && data.last) {
            const lastPageUrl = new URL(data.last);
            const lastPageNumber = parseInt(lastPageUrl.searchParams.get("page") || "0", 10);
            setLastPage(lastPageNumber);
        }
    }, [data]);
    const renderContent = () => {
        if (loading) {
            return <Loading />;
        }
        if (error) {
            return <p>Error: {error}</p>;
        }
        if (!data) {
            return <p>No items found</p>;
        }
        return (
            <>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                        <tr>
                            <th>Page id</th>
                            <th>Title</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.list.map((doc) => (
                            <tr key={doc.nid} className="hover">
                                <th>{doc.nid}</th>
                                <td>
                                    <Link href={`/document/${doc.nid}`} className="text hover:text-blue-800">
                                        {doc.title}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="btn-group grid grid-cols-2 space-between justify-end">
                    <button
                        className="btn text-white px-4 py-2 rounded-md mx-2"
                        onClick={() => setPage(page > 0 ? page - 1 : 0)}
                        disabled={page === 0}
                    >
                        Previous
                    </button>
                    <button
                        className="btn text-white px-4 py-2 rounded-md mx-2"
                        onClick={() => setPage(page + 1)}
                        disabled={page >= lastPage}
                    >
                        Next
                    </button>
                </div>
            </>
        );
    };

    return (
        <div className="bg-success/0 shadow-md rounded-md p-4">
            <h2 className="text-xl font-semibold mb-4 capitalize">Drupal Wiki</h2>
            {renderContent()}
        </div>
    );
};

export default DocsList;
