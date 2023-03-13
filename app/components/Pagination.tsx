import React from "react";

export default function Pagination({currentPage, totalCount, pageSize, onPageChange}: {currentPage: any, totalCount: any, pageSize: any, onPageChange: any}) {
    return (
        <div className="btn-group grid grid-cols-2 p-10 space-between justify-end">
                <button className="btn btn-outline">Previous page</button>
                <button className="btn btn-outline">Next page</button>
        </div>
    );
}