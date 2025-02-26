import React, { useState, useEffect } from 'react';
import Facet from "@/app/components/Facets/Facet";

interface FacetsListProps {
    categories: Category[];
    onFacetClick: (id: number) => void;
    selectedCategoryId?: number | null;
}

const Facets: React.FC<FacetsListProps> = ({ categories, onFacetClick, selectedCategoryId: externalSelectedId }) => {
    const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({});
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(externalSelectedId || null);
    const [filterText, setFilterText] = useState('');

    // Update internal state when external selectedCategoryId changes
    useEffect(() => {
        if (externalSelectedId !== undefined) {
            setSelectedCategoryId(externalSelectedId);
            
            // Expand parent categories if a child is selected
            if (externalSelectedId) {
                // Find if the selected category is a child category
                categories.forEach(category => {
                    if (category.children) {
                        const isParentOfSelected = category.children.some(
                            child => child.id === externalSelectedId || 
                            (child.children && child.children.some(grandchild => grandchild.id === externalSelectedId))
                        );
                        
                        if (isParentOfSelected) {
                            setExpandedCategories(prev => ({
                                ...prev,
                                [category.id]: true
                            }));
                            
                            // If it's a grandchild, also expand the child
                            category.children.forEach(child => {
                                if (child.children && child.children.some(grandchild => grandchild.id === externalSelectedId)) {
                                    setExpandedCategories(prev => ({
                                        ...prev,
                                        [child.id]: true
                                    }));
                                }
                            });
                        }
                    }
                });
            }
        }
    }, [externalSelectedId, categories]);

    // Toggle category expansion
    const handleToggleExpand = (id: number) => {
        setExpandedCategories(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Handle category selection
    const handleCategoryClick = (id: number) => {
        setSelectedCategoryId(id);
        onFacetClick(id);
    };
    
    // Filter categories based on search text
    const filterCategories = (items: Category[], searchText: string): Category[] => {
        if (!searchText) return items;
        
        return items.filter(category => {
            const matchesName = category.name.toLowerCase().includes(searchText.toLowerCase());
            
            // Check if any children match
            const hasMatchingChildren = category.children ? 
                filterCategories(category.children, searchText).length > 0 : false;
            
            return matchesName || hasMatchingChildren;
        }).map(category => {
            if (category.children) {
                return {
                    ...category,
                    children: filterCategories(category.children, searchText)
                };
            }
            return category;
        });
    };

    // Recursive function to render categories
    const renderCategoryItems = (items: Category[], level = 0): JSX.Element[] => {
        return items.map((category: Category) => {
            const hasChildren = category.children && category.children.length > 0;
            const isExpanded = !!expandedCategories[category.id];
            
            return (
                <React.Fragment key={category.id}>
                    <Facet
                        id={category.id}
                        name={category.name}
                        isSelected={selectedCategoryId === category.id}
                        hasChildren={hasChildren}
                        isExpanded={isExpanded}
                        onCategoryClick={handleCategoryClick}
                        onToggleExpand={handleToggleExpand}
                        level={level}
                    />
                    
                    {hasChildren && isExpanded && category.children && (
                        <ul className="nested-categories">
                            {renderCategoryItems(category.children, level + 1)}
                        </ul>
                    )}
                </React.Fragment>
            );
        });
    };
    
    const filteredCategories = filterText ? filterCategories(categories, filterText) : categories;

    return (
        <div className="categories-container">
            <div className="px-4 py-3 border-b">
                <h3 className="text-lg font-medium">Categories</h3>
                <p className="text-sm text-gray-500 mt-1">Browse by topic</p>
            </div>
            <div className="p-2">
                <div className="search-filter mb-4">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Filter categories..."
                            className="input input-bordered input-sm w-full pl-8"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                        />
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="absolute top-2 left-2 h-4 w-4 text-gray-400" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {filterText && (
                            <button 
                                className="absolute top-2 right-2 h-4 w-4 text-gray-400 hover:text-gray-600"
                                onClick={() => setFilterText('')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
                <ul className="menu menu-compact flex flex-col">
                    {filteredCategories.length > 0 ? (
                        renderCategoryItems(filteredCategories)
                    ) : (
                        <li className="text-center py-4 text-gray-500">No categories match your search</li>
                    )}
                </ul>
            </div>
            <div className="p-3 bg-base-200 text-xs text-gray-500 rounded-b-box">
                <p>Cannot find what you need? <button className="text-primary">Contact us</button></p>
            </div>
        </div>
    );
};

export default Facets;