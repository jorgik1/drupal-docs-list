import React from 'react';

export default function Loading() {
    return (
        <div className="mx-auto max-w-7xl py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar skeleton - desktop only */}
                <div className="hidden lg:block lg:col-span-1">
                    <div className="bg-base-100 rounded-lg shadow-md p-4 animate-pulse">
                        <div className="h-6 bg-base-300 rounded w-1/2 mb-6"></div>
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-4 bg-base-300 rounded w-3/4"></div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Main content skeleton */}
                <div className="lg:col-span-3">
                    <div className="bg-base-100 rounded-lg shadow-md p-6 animate-pulse">
                        {/* Title */}
                        <div className="h-8 bg-base-300 rounded-lg w-3/4 mb-6"></div>
                        
                        {/* Meta info */}
                        <div className="flex gap-4 mb-8">
                            <div className="h-4 bg-base-300 rounded w-24"></div>
                            <div className="h-4 bg-base-300 rounded w-32"></div>
                        </div>
                        
                        {/* Content paragraphs */}
                        <div className="space-y-4 mb-8">
                            <div className="h-4 bg-base-300 rounded w-full"></div>
                            <div className="h-4 bg-base-300 rounded w-full"></div>
                            <div className="h-4 bg-base-300 rounded w-5/6"></div>
                            <div className="h-4 bg-base-300 rounded w-full"></div>
                            <div className="h-4 bg-base-300 rounded w-4/5"></div>
                        </div>
                        
                        {/* Section header */}
                        <div className="h-6 bg-base-300 rounded-lg w-1/3 mb-4 mt-8"></div>
                        
                        {/* More content */}
                        <div className="space-y-4">
                            <div className="h-4 bg-base-300 rounded w-full"></div>
                            <div className="h-4 bg-base-300 rounded w-full"></div>
                            <div className="h-4 bg-base-300 rounded w-3/4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}