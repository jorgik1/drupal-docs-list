import React from "react";
import Link from "next/link";

const DocItem: React.FC<DocItem> = ({ nid, title}) => {
    return <tr className="hover">
        <th>{nid}</th>
        <td>
            <Link href={`/document/${nid}`} className="text hover:text-blue-800">
                {title}
            </Link>
        </td>
    </tr>;
}

export default DocItem;