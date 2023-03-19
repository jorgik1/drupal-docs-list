"use client";
import React, {useState} from "react";
import DocsList from "@/app/components/DocList";
import FacetsList from "@/app/components/FacetsList";


const Page: React.FC = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const handleCategoryClick = (id: number) => {
        setSelectedCategoryId(id);
    };
    return (
        <>
            <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <div className="bg-success/0 shadow-md rounded-md p-4">
                            <h2 className="text-xl font-semibold mb-4">Categories</h2>
                            <FacetsList onFacetClick={handleCategoryClick}/>
                        </div>
                    </div>
                    <div className="lg:col-span-3">
                        <DocsList type="documentation" category={selectedCategoryId}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
