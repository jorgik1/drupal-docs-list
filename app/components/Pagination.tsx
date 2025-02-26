import React from "react";

const Pagination = (props: { onClickPrev: () => void, page: number, onClickNext: () => void, lastPage: number }) => {
    return (
        <div className="flex items-center justify-between py-4">
            <div className="flex-1 flex justify-between sm:hidden">
                {/* Mobile pagination */}
                <button
                    onClick={props.onClickPrev}
                    disabled={props.page === 0}
                    className={`btn btn-sm ${props.page === 0 ? 'btn-disabled' : 'btn-primary'}`}
                >
                    Previous
                </button>
                <span className="text-sm font-medium self-center mx-2">
                    Page {props.page + 1} of {props.lastPage + 1}
                </span>
                <button
                    onClick={props.onClickNext}
                    disabled={props.page >= props.lastPage}
                    className={`btn btn-sm ${props.page >= props.lastPage ? 'btn-disabled' : 'btn-primary'}`}
                >
                    Next
                </button>
            </div>
            
            {/* Desktop pagination */}
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-500">
                        Showing page <span className="font-medium">{props.page + 1}</span> of{" "}
                        <span className="font-medium">{props.lastPage + 1}</span>
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            onClick={props.onClickPrev}
                            disabled={props.page === 0}
                            className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-medium ${
                                props.page === 0
                                    ? 'text-gray-400 bg-base-200 cursor-not-allowed'
                                    : 'text-gray-700 bg-base-100 hover:bg-base-200'
                            } ring-1 ring-inset ring-base-300`}
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-5 w-5" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="ml-1">Previous</span>
                        </button>
                        
                        {/* Page indicators */}
                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-base-300 bg-base-100">
                            {props.page + 1}
                        </span>
                        
                        <button
                            onClick={props.onClickNext}
                            disabled={props.page >= props.lastPage}
                            className={`relative inline-flex items-center rounded-r-md px-3 py-2 text-sm font-medium ${
                                props.page >= props.lastPage
                                    ? 'text-gray-400 bg-base-200 cursor-not-allowed'
                                    : 'text-gray-700 bg-base-100 hover:bg-base-200'
                            } ring-1 ring-inset ring-base-300`}
                        >
                            <span className="mr-1">Next</span>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-5 w-5" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Pagination;