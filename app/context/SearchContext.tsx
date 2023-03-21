"use client";
import { createContext, Context} from 'react';

interface SearchContextProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const SearchContext: Context<SearchContextProps> = createContext({
    searchTerm: '',
    setSearchTerm: (term: string) => {},
});

export default SearchContext;