import React from 'react';

interface FacetProps {
    id: number;
    name: string;
    onCategoryClick: (id: number) => void;
}

const Facet: React.FC<FacetProps> = ({ id, name, onCategoryClick }) => {
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

export default Facet;