import React from 'react';

interface FacetProps {
    id: number;
    name: string;
    isSelected?: boolean;
    hasChildren?: boolean;
    isExpanded?: boolean;
    onCategoryClick: (id: number) => void;
    onToggleExpand?: (id: number) => void;
    level?: number;
}

const Facet: React.FC<FacetProps> = ({ 
    id, 
    name, 
    isSelected = false, 
    hasChildren = false,
    isExpanded = false,
    onCategoryClick,
    onToggleExpand,
    level = 0
}) => {
    const handleClick = () => {
        onCategoryClick(id);
    };

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onToggleExpand) {
            onToggleExpand(id);
        }
    };

    return (
        <li className={`mb-1 ${level > 0 ? 'ml-3' : ''}`}>
            <div 
                className={`
                    flex items-center py-2 px-3 rounded-md cursor-pointer transition-all
                    ${isSelected ? 'bg-primary text-primary-content font-medium' : 'hover:bg-base-200'}
                `}
                onClick={handleClick}
            >
                {hasChildren && (
                    <button 
                        className="mr-2 focus:outline-none"
                        onClick={handleToggle}
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}
                
                {!hasChildren && (
                    <div className="mr-6 w-4"></div>
                )}
                
                <span className="truncate flex-1">{name}</span>
                
                {isSelected && (
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 ml-2"
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </div>
        </li>
    );
};

export default Facet;