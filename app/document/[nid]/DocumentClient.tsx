"use client";
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useDocument } from '@/app/hooks/useDocument';
import Loading from "@/app/document/loading";
import SearchContext from "@/app/context/SearchContext";
import filterContent from "@/app/utils/filterContent";
import Link from 'next/link';

interface DocumentClientProps {
  nid: string;
}

const DocumentClient: React.FC<DocumentClientProps> = ({ nid }) => {
    const { data, isLoading, error } = useDocument(nid);
    const { searchTerm } = useContext(SearchContext) || { searchTerm: '' };
    const [headings, setHeadings] = useState<{id: string, text: string, level?: string}[]>([]);
    const [activeHeading, setActiveHeading] = useState('');
    const [copied, setCopied] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    
    // Client-side only code
    const [isBrowser, setIsBrowser] = useState(false);
    useEffect(() => {
        setIsBrowser(true);
    }, []);

    // Extract headings for table of contents when data is loaded - client-side only
    useEffect(() => {
        if (!isBrowser || !data) return;
        
        // Using browser APIs to parse HTML
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(data.body.value, 'text/html');
        
        // Find all headings (h2, h3)
        const headingElements = htmlDoc.querySelectorAll('h2, h3');
        
        const extractedHeadings = Array.from(headingElements).map((heading, index) => {
            // If heading doesn't have ID, generate one
            const id = heading.id || `heading-${index}`;
            
            // Add ID to original heading if it doesn't have one
            if (!heading.id) {
                heading.id = id;
            }
            
            return {
                id,
                text: heading.textContent || '',
                level: heading.tagName.toLowerCase()
            };
        });
        
        // Update the filtered content with the modified HTML that includes heading IDs
        setHeadings(extractedHeadings);
    }, [data, isBrowser]);

    // Update active heading on scroll - client-side only
    useEffect(() => {
        if (!isBrowser || !contentRef.current || headings.length === 0) return;

        const handleScroll = () => {
            // Find all heading elements in the document
            const headingElements = contentRef.current?.querySelectorAll('h2, h3') || [];
            
            // Find the heading that's currently visible
            for (let i = headingElements.length - 1; i >= 0; i--) {
                const heading = headingElements[i];
                const rect = heading.getBoundingClientRect();
                
                if (rect.top <= 100) {
                    setActiveHeading(heading.id);
                    break;
                }
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [headings, contentRef, isBrowser]);

    // Copy link to clipboard
    const copyLink = () => {
        if (!isBrowser) return;
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200">
                <div className="text-center max-w-lg p-8 bg-base-100 rounded-lg shadow-md">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-16 w-16 text-error mx-auto mb-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h1 className="text-2xl font-bold text-error mb-2">Error Loading Document</h1>
                    <p className="text-gray-600 mb-6">{error instanceof Error ? error.message : 'Something went wrong'}</p>
                    <Link href="/document" className="btn btn-primary">
                        Return to Documents
                    </Link>
                </div>
            </div>
        );
    }

    if (!data) {
        return <Loading/>;
    }

    // Filter the content if there's a search term
    const filteredContent = searchTerm
        ? filterContent(data.body.value, searchTerm)
        : data.body.value;

    return (
        <>
            <div className="mx-auto max-w-7xl py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar with table of contents - desktop only */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-base-100 rounded-lg shadow p-4">
                                <h3 className="font-medium text-lg mb-4">On this page</h3>
                                
                                {isBrowser && (
                                    <nav className="toc">
                                        <ul className="space-y-2">
                                            {headings.map((heading) => (
                                                <li 
                                                    key={heading.id} 
                                                    className={`${heading.level === 'h3' ? 'ml-4' : ''}`}
                                                >
                                                    <a 
                                                        href={`#${heading.id}`}
                                                        className={`
                                                            block py-1 border-l-2 pl-3 text-sm transition-colors
                                                            ${activeHeading === heading.id 
                                                                ? 'border-primary text-primary font-medium' 
                                                                : 'border-transparent hover:border-gray-300 hover:text-gray-800'}
                                                        `}
                                                    >
                                                        {heading.text}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Main content */}
                    <div className="lg:col-span-3">
                        <article className="bg-base-100 rounded-lg shadow p-6 md:p-8">
                            {/* Document header */}
                            <header className="mb-8 pb-6 border-b">
                                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                    {data.title}
                                </h1>
                                
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-4 w-4 mr-1" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>5 min read</span>
                                    </div>
                                    
                                    <button 
                                        className="flex items-center"
                                        onClick={copyLink}
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-4 w-4 mr-1" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        <span>{copied ? 'Copied!' : 'Copy link'}</span>
                                    </button>
                                </div>
                            </header>
                            
                            {/* Document content */}
                            <div 
                                ref={contentRef}
                                className="prose prose-lg max-w-none prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-pre:bg-base-200 prose-pre:p-4 prose-pre:rounded-lg"
                                dangerouslySetInnerHTML={{__html: filteredContent}}
                            ></div>
                            
                            {/* Feedback section */}
                            <div className="mt-12 pt-6 border-t">
                                <h3 className="text-lg font-medium mb-4">Was this helpful?</h3>
                                
                                <div className="flex gap-4">
                                    <button className="btn btn-outline btn-sm gap-2">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-4 w-4" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                        </svg>
                                        Yes
                                    </button>
                                    
                                    <button className="btn btn-outline btn-sm gap-2">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-4 w-4" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                                        </svg>
                                        No
                                    </button>
                                </div>
                                
                                <div className="mt-4 text-sm text-gray-500">
                                    <p>See a typo or have suggestions? <a href="#" className="link link-primary">Contribute to this page</a></p>
                                </div>
                            </div>
                        </article>
                        
                        {/* Next/Previous navigation */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                            <Link 
                                href="#" 
                                className="card bg-base-100 shadow hover:shadow-md transition-shadow"
                            >
                                <div className="card-body p-4">
                                    <p className="text-xs text-gray-500">Previous</p>
                                    <h3 className="card-title text-base">Getting Started with Drupal</h3>
                                </div>
                            </Link>
                            
                            <Link 
                                href="#" 
                                className="card bg-base-100 shadow hover:shadow-md transition-shadow text-right"
                            >
                                <div className="card-body p-4">
                                    <p className="text-xs text-gray-500">Next</p>
                                    <h3 className="card-title text-base justify-end">Drupal Module Development</h3>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Back to top button - client-side only */}
            {isBrowser && (
                <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-6 right-6 p-3 rounded-full bg-primary text-primary-content shadow-lg hover:bg-primary-focus transition-colors"
                    aria-label="Back to top"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg>
                </button>
            )}
        </>
    );
};

export default DocumentClient;