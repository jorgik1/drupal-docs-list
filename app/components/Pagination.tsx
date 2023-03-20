import React from "react";

const Pagination = (props: { onClick: () => void, page: number, onClick1: () => void, lastPage: number }) => {
    return <div className="btn-group grid grid-cols-2 space-between justify-end">
        <button
            className="btn text-white px-4 py-2 rounded-md mx-2"
            onClick={props.onClick}
            disabled={props.page === 0}
        >
            Previous
        </button>
        <button
            className="btn text-white px-4 py-2 rounded-md mx-2"
            onClick={props.onClick1}
            disabled={props.page >= props.lastPage}
        >
            Next
        </button>
    </div>;
}

export default Pagination;