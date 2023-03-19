import React from 'react';
import Facets from "@/app/components/Facets";

interface FacetsListProps {
    onFacetClick: (id: number) => void
}
const FacetsList: React.FC<FacetsListProps> = ({ onFacetClick }) => {
    const categories = [
        // Add your category IDs and names here
        // I need to find a way to get this from the API
        { id: 2802989, name: "Development" },
        { id: 2809279, name: "Development tools" },
        { id: 2804051, name: "Using composer" },
        { id: 3170898, name: "Git version control" },
        { id: 3175648, name: "Managing distribution project" },
        { id: 2907842, name: "Security" },
        { id: 3156223, name: "Drupal project issues" },
        { id: 2804427, name: "Local server setup" },
        { id: 2803901, name: "Usability testing" },
        { id: 2802991, name: "Coding standards" },
        { id: 2818707, name: "Profilling Drupal" },
        { id: 2804041, name: "User interface" },
        { id: 2792957, name: "Theming Drupal" },
        { id: 2804139, name: "Creating modules" },
        { id: 2814041, name: "Drupal APIs" },
        { id: 2819027, name: "Automated testing" },
    ];

    return (
        <ul className="menu menu-compact flex flex-col p-2 px-2">
            {categories.map((category) => (
                <Facets
                    key={category.id}
                    id={category.id}
                    name={category.name}
                    onCategoryClick={onFacetClick}
                />
            ))}
        </ul>
    );
};

export default FacetsList;