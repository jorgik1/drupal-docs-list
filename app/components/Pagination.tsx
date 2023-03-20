import React from "react";

const Pagination = (props: { onClickPrev: () => void, page: number, onClickNext: () => void, lastPage: number }) => {
    return <div className="btn-group grid grid-cols-2 space-between justify-end">
        <button
            className="btn text-white px-4 py-2 rounded-md mx-2"
            onClick={props.onClickPrev}
            disabled={props.page === 0}
        >
            Previous
        </button>
        <button
            className="btn text-white px-4 py-2 rounded-md mx-2"
            onClick={props.onClickNext}
            disabled={props.page >= props.lastPage}
        >
            Next
        </button>
    </div>;
}

export default Pagination;