
interface DocItem {
    nid: number;
    url: string;
    title: string;
}

interface DocsData {
    list: DocItem[];
    last: string | null;
    next: string | null;
}

interface DocsListProps {
    type: string;
    category: number | null;
}

interface SingleDocPageData {
    title: string;
    body: {
        value: string;
    };
}
