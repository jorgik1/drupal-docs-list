
interface DocItem {
    nid: number;
    url: string;
    title: string;
    body: {
        value: string;
    };
}

interface DocsData {
    list: DocItem[];
    last: string | null;
    next: string | null;
}

interface DocItemsPageProps {
    type: string;
    category: number | null;
}

interface FacetsListProps {
    categories: Category[];
    onFacetClick: (id: number) => void
}

interface Category {
    id: number;
    name: string;
    children?: Category[];
}

