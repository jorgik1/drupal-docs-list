"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DocItemsPage from "@/app/components/Document/DocItemsPage";
import Facets from "@/app/components/Facets/Facets";
import categories from "@/app/components/Facets/categories";
import Script from "next/script";

// Declare window property for TypeScript
const Page: React.FC = () => {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');
    
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
        categoryParam ? parseInt(categoryParam, 10) : null
    );
    const [showMobileFilter, setShowMobileFilter] = useState(false);

    // Update selected category when URL parameter changes
    useEffect(() => {
        if (categoryParam) {
            setSelectedCategoryId(parseInt(categoryParam, 10));
        } else {
            setSelectedCategoryId(null);
        }
    }, [categoryParam]);

    const handleCategoryClick = (id: number) => {
        setSelectedCategoryId(id);
        setShowMobileFilter(false);
        
        // Update URL when category changes
        const url = new URL(window.location.href);
        url.searchParams.set('category', id.toString());
        window.history.pushState({}, '', url.toString());
    };

    const toggleMobileFilter = () => {
        setShowMobileFilter(!showMobileFilter);
    };

    // Find the currently selected category name - check nested categories too
    const findCategory = (id: number | null): Category | undefined => {
        if (!id) return undefined;
        
        // Check top-level categories
        const topLevel = categories.find(cat => cat.id === id);
        if (topLevel) return topLevel;
        
        // Check nested categories (one level deep)
        for (const category of categories) {
            if (category.children) {
                const found = category.children.find(child => child.id === id);
                if (found) return found;
                
                // Check second level nesting if exists
                for (const child of category.children) {
                    if (child.children) {
                        const foundNested = child.children.find(nested => nested.id === id);
                        if (foundNested) return foundNested;
                    }
                }
            }
        }
        
        return undefined;
    };
    
    const selectedCategory = findCategory(selectedCategoryId);

    return (
        <>
            {/* Page header with title and description */}
            <div className="bg-base-200">
                <div className="mx-auto max-w-7xl py-8 px-4 sm:py-12 sm:px-6">
                    <h1 className="text-3xl font-bold mb-4 sm:text-4xl">Drupal Documentation</h1>
                    <p className="text-lg text-gray-600 max-w-3xl">
                        Find comprehensive guides and documentation to help you get the most out of Drupal.
                        {selectedCategory && (
                            <span className="font-medium"> Currently browsing: {selectedCategory.name}</span>
                        )}
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
                {/* Mobile filter button - only visible on mobile */}
                <div className="lg:hidden mb-6">
                    <button 
                        className="btn btn-primary btn-block gap-2"
                        onClick={toggleMobileFilter}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-5 w-5" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                        {showMobileFilter ? 'Hide Categories' : 'Show Categories'}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Categories sidebar */}
                    {/* On mobile: shown as modal when activated */}
                    {/* On desktop: always visible */}
                    <div className={`
                        ${showMobileFilter 
                            ? 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 lg:relative lg:bg-transparent lg:p-0 lg:block lg:col-span-1' 
                            : 'hidden lg:block lg:col-span-1'}
                    `}>
                        <div className={`
                            bg-base-100 shadow-lg rounded-lg overflow-hidden w-full max-w-sm lg:max-w-none
                            ${showMobileFilter ? 'max-h-[80vh] overflow-auto' : ''}
                        `}>
                            {/* Close button for mobile */}
                            {showMobileFilter && (
                                <div className="flex justify-end p-2 lg:hidden">
                                    <button 
                                        className="btn btn-circle btn-sm"
                                        onClick={() => setShowMobileFilter(false)}
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-6 w-6" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                            
                            <Facets 
                                categories={categories} 
                                onFacetClick={handleCategoryClick}
                                selectedCategoryId={selectedCategoryId}
                            />
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="lg:col-span-3">
                        <DocItemsPage type="documentation" category={selectedCategoryId}/>
                    </div>
                </div>
            </div>

            {/* Chat widget scripts */}
            <Script id="script" strategy="lazyOnload" src="https://openchat.so/chat.js"/>
            <Script 
                id="script-chat" 
                strategy="beforeInteractive"
                onReady={() => {
                    document.addEventListener('DOMContentLoaded', function() {
                        // Use type assertion to avoid TypeScript error
                        const initializeChatWidget = (window as any).initializeChatWidget || {};
                        var chatConfig = {
                            token: "hsDOwOBBfl1Ars4BZM1m",
                        };
                        if (initializeChatWidget && typeof initializeChatWidget === 'function') {
                            initializeChatWidget(chatConfig);
                        }
                    });
                }}
            />
            
            {/* Help button */}
            <div className="fixed bottom-6 right-6 z-10">
                <button className="btn btn-circle btn-primary shadow-lg">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
        </>
    );
};

export default Page;