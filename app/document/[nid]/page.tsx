"use client";
import React from 'react';
import usePageFetch from '@/app/hooks/usePageFetch';
import Loading from "@/app/document/loading";

const Page = ({params}: { params: { nid: string } }) => {
    const {data, loading} = usePageFetch(params.nid);

    if (loading || !data) {
        return <Loading/>;
    }

    return (
        <>
            <div className="max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <section className="flex flex-col lg:flex-row pb-24 px-0 lg:px-10">
                    <div className="px-10">
                        <h1 className="headerTitle px-0 no-underline pb-2">
                            <p className="text-5xl font-bold">{data.title}</p>
                        </h1>
                        <p dangerouslySetInnerHTML={{__html: data.body.value}} className="pt-4"></p>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Page;