import React from "react";
import Footer from "../components/Footer";
import fetchAPI from "@/app/lib/api/dataFetcher";
import Link from "next/link";
import Pagination from "@/app/components/Pagination";

export default async function Page() {
    const apiData = await fetchAPI(new URLSearchParams({type: 'guide'}))
    const items = apiData.list.map((item: any) => {
        item.url = `/document/${item.nid}`;
        item.body = item.body?.value?.replace(/(<([^>]+)>)/gi, "");
        return item;
    });
    return (
        <>
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div
                    className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {items.map((item: any) => {
                        return (
                            <Link key={item.nid} href={item.url}>
                                <div className="card w-auto h-32 transform transition duration-500 hover:scale-110 bg-base-300/0 hover:bg-base-300/100 shadow-xl">
                                    <div className="card-body">
                                        <h2 className="card-title font-sans">{item.title}</h2>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
                <Pagination
                    currentPage={0}
                    totalCount={apiData.last}
                    pageSize={0}
                    onPageChange={() => {}}  />
            </div>
            <Footer/>
        </>
    );
}