"use client";
import React, {useContext, useEffect, useState} from 'react';
import {requestParams, useFetch} from '@/app/hooks/useFetch';
import Loading from '@/app/document/loading';
import SearchContext from "@/app/context/SearchContext";
import DocItem from "@/app/components/Document/DocItems";
import Pagination from "@/app/components/Pagination";


const DocItemsPage: React.FC<DocItemsPageProps> = ({type, category}) => {
    const [page, setPage] = useState(0);
    const [lastPage, setLastPage] = useState(0);

    const initialUrlParams = requestParams(type, page, category);
    const {data, loading, error} = useFetch(initialUrlParams);

    const {searchTerm} = useContext(SearchContext);

    useEffect(() => {
        if (data && data.last) {
            const lastPageUrl = new URL(data.last);
            const lastPageNumber = parseInt(lastPageUrl.searchParams.get("page") || "0", 10);
            setLastPage(lastPageNumber);
        }
    }, [data]);

    const renderContent = () => {
        if (loading) {
            return <Loading/>;
        }
        if (error) {
            return <p>Error: {error}</p>;
        }
        if (!data) {
            return <p>No items found</p>;
        }

        const filteredItems = data.list.filter((item) => {
            return item.title.toLowerCase().includes(searchTerm.toLowerCase());
        });

        return (
            <>
                <DocItem filteredItems={filteredItems}/>
                <Pagination onClick={() => setPage(page > 0 ? page - 1 : 0)} page={page}
                            onClick1={() => setPage(page + 1)} lastPage={lastPage}/>
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

export default DocItemsPage;
