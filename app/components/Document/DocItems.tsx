import Link from "next/link";
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
                    <tr key={doc.nid} className="hover">
                        <th>{doc.nid}</th>
                        <td>
                            <Link href={`/document/${doc.nid}`} className="text hover:text-blue-800">
                                {doc.title}
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
export default DocItems;