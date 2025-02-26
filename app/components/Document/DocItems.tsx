import DocItem from "./DocItem";
import React from "react";

interface DocItemsProps {
    filteredItems: DocItem[];
}

const DocItems = ({filteredItems}: DocItemsProps) => {
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium mb-2">No documents found</h3>
                <p className="text-gray-500">Try adjusting your search or filters to find what you&#39re looking for</p>
            </div>
        );
    }
    
    return (
        <div className="bg-base-100 rounded-lg shadow">
            {/* Header */}
            <div className="p-4 border-b border-base-200">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Documents ({filteredItems.length})</h3>
                    <div className="badge badge-primary badge-outline">{filteredItems.length} results</div>
                </div>
            </div>
            
            {/* List of documents */}
            <div className="divide-y divide-base-200">
                {filteredItems.map((doc) => (
                    <DocItem 
                        key={doc.nid} 
                        nid={doc.nid} 
                        title={doc.title} 
                        body={doc.body} 
                        url={doc.url}
                    />
                ))}
            </div>
        </div>
    );
}

export default DocItems;