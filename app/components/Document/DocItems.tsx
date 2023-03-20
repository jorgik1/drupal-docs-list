import DocItem from "./DocItem";
import React from "react";

interface DocItemsProps{
    filteredItems: DocItem[];
}

const DocItems = ({filteredItems}: DocItemsProps) => {
    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                <tr>
                    <th>Page id</th>
                    <th>Title</th>
                </tr>
                </thead>
                <tbody>
                {filteredItems.map((doc) => (
                    <DocItem key={doc.nid} nid={doc.nid} title={doc.title} body={doc.body} url={doc.url}/>
                ))}
                </tbody>
            </table>
        </div>
    );
}
export default DocItems;