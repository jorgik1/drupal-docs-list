import React from "react";
import Link from "next/link";

const DocItem: React.FC<DocItem> = ({ nid, title, body }) => {
    // Generate a summary from the body text if available
    const getSummary = () => {
        if (!body || !body.value) return "";
        
        if (typeof document === 'undefined') return ""; // Server-side safety
        
        // Create temporary element to parse HTML and extract text
        const tempElement = document.createElement('div');
        tempElement.innerHTML = body.value;
        const textContent = tempElement.textContent || tempElement.innerText;
        
        // Get first 120 characters as summary
        return textContent.substring(0, 120) + (textContent.length > 120 ? '...' : '');
    };

    // Estimate read time (1 min per 200 words)
    const getReadTime = () => {
        if (!body || !body.value) return "1 min read";
        
        if (typeof document === 'undefined') return "1 min read"; // Server-side safety
        
        const tempElement = document.createElement('div');
        tempElement.innerHTML = body.value;
        const textContent = tempElement.textContent || tempElement.innerText;
        
        const wordCount = textContent.split(/\s+/).length;
        const minutes = Math.max(1, Math.round(wordCount / 200));
        
        return `${minutes} min read`;
    };

    return (
        <div className="p-4 hover:bg-base-200 transition-colors">
            <div className="flex justify-between items-center">
                <div className="flex-1">
                    <Link 
                        href={`/document/${nid}`} 
                        className="text-lg font-medium hover:text-primary transition-colors"
                    >
                        {title}
                    </Link>
                    
                    {body && (
                        <>
                            <p className="text-sm text-gray-500 mt-1 hidden md:block">
                                {typeof window !== 'undefined' ? getSummary() : ''}
                            </p>
                            
                            <div className="flex items-center mt-2 text-xs text-gray-400">
                                <span className="mr-4">ID: {nid}</span>
                                <span>{typeof window !== 'undefined' ? getReadTime() : '1 min read'}</span>
                            </div>
                        </>
                    )}
                </div>
                
                <Link 
                    href={`/document/${nid}`} 
                    className="btn btn-ghost btn-circle btn-sm flex-shrink-0"
                    aria-label="View document"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </Link>
            </div>
        </div>
    );
}

export default DocItem;