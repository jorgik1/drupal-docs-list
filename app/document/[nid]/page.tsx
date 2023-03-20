"use client";
import React, {useContext} from 'react';
import usePageFetch from '@/app/hooks/usePageFetch';
import Loading from "@/app/document/loading";
import SearchContext from "@/app/context/SearchContext";
import filterContent from "@/app/utils/filterContent";

const Page = ({params}: { params: { nid: string } }) => {
    const {data, loading} = usePageFetch(params.nid);
    const {searchTerm} = useContext(SearchContext);

    if (loading || !data) {
        return <Loading/>;
    }
    // Filter the content if there's a search term
    const filteredContent = searchTerm
        ? filterContent(data.body.value, searchTerm)
        : data.body.value;

    return (
        <>
            <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-2 gap-8">
                    <div className="lg:col-span-3">
                        <h1 className="headerTitle px-0 no-underline pb-2">
                            <p className="text-5xl font-bold">{data.title}</p>
                        </h1>
                        <p dangerouslySetInnerHTML={{__html: filteredContent}} className="pt-4"></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;