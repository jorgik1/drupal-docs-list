import React from 'react';

interface FacetsProps {
    id: number;
    name: string;
    onCategoryClick: (id: number) => void;
}

const Facets: React.FC<FacetsProps> = ({ id, name, onCategoryClick }) => {
    const handleClick = () => {
        onCategoryClick(id);
    };

    return (
        <li className="mb-1">
            <span onClick={handleClick}>
                {name}
            </span>
        </li>
    );
};

export default Facets;