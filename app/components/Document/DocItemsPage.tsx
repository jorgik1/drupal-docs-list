import React, { useContext, useState, useEffect } from 'react';
import { useDocuments } from '@/app/hooks/useDocuments';
import Loading from '@/app/document/loading';
import SearchContext from "@/app/context/SearchContext";
import DocItem from "@/app/components/Document/DocItems";
import Pagination from "@/app/components/Pagination";

const DocItemsPage: React.FC<DocItemsPageProps> = ({ type, category }) => {
    const [page, setPage] = useState(0);
    const [lastPage, setLastPage] = useState(0);
    const { searchTerm } = useContext(SearchContext);
    
    // Use the new React Query hook
    const { data, isLoading, error } = useDocuments(type, page, category);

    // Reset to first page when category changes
    useEffect(() => {
        setPage(0);
    }, [category]);

    // Extract last page from data
    useEffect(() => {
        // Check if data exists and has the expected structure
        if (data && typeof data === 'object' && 'last' in data && data.last) {
            try {
                const lastPageUrl = new URL(data.last as string);
                const lastPageNumber = parseInt(lastPageUrl.searchParams.get("page") || "0", 10);
                setLastPage(lastPageNumber);
            } catch (e) {
                console.error("Error parsing last page URL:", e);
            }
        }
    }, [data]);

    const renderContent = () => {
        if (isLoading) {
            return <Loading />;
        }

        if (error) {
            return (
                <div className="bg-error/10 p-4 rounded-lg">
                    <h3 className="text-error font-medium mb-2">Error loading documents</h3>
                    <p className="text-sm">{error instanceof Error ? error.message : 'An unexpected error occurred'}</p>
                </div>
            );
        }

        // Make sure data exists and has the expected structure
        if (!data || typeof data !== 'object' || !('list' in data) || !Array.isArray(data.list) || data.list.length === 0) {
            return (
                <div className="bg-base-200 rounded-lg p-8 text-center">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="mx-auto h-12 w-12 text-gray-400 mb-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-medium mb-2">No documents found</h3>
                    <p className="text-gray-500">Try adjusting your search or selecting a different category</p>
                </div>
            );
        }

        // Filter items based on search term
        const filteredItems = data.list.filter((item) => {
            return item.title.toLowerCase().includes(searchTerm.toLowerCase());
        });

        if (filteredItems.length === 0) {
            return (
                <div className="bg-base-200 rounded-lg p-8 text-center">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="mx-auto h-12 w-12 text-gray-400 mb-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 className="text-lg font-medium mb-2">No matching documents</h3>
                    <p className="text-gray-500">No documents match your search term</p>
                </div>
            );
        }

        return (
            <>
                <DocItem filteredItems={filteredItems} />
                <Pagination 
                    onClickPrev={() => setPage(page > 0 ? page - 1 : 0)} 
                    page={page}
                    onClickNext={() => setPage(page + 1)} 
                    lastPage={lastPage} 
                />
            </>
        );
    };

    // Get the category name if available
    let categoryName = "";
    if (category) {
        // This is a simplified approach - for a production app, you'd want to look this up from your category data
        categoryName = `Category ${category}`;
    }

    return (
        <div className="bg-base-100 shadow-md rounded-md p-4">
            <h2 className="text-xl font-semibold mb-4 capitalize">
                {categoryName ? `${categoryName} Documentation` : "Drupal Documentation"}
            </h2>
            {renderContent()}
        </div>
    );
};

export default DocItemsPage;