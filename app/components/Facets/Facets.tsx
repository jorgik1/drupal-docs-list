import React from 'react';
import Facet from "@/app/components/Facets/Facet";

const Facets: React.FC<FacetsListProps> = ({categories, onFacetClick}) => {
    const renderCategories: React.FC<Category[]> = (categories, onFacetClick) => {
        return (
            <ul className="menu menu-compact flex flex-col p-2 px-2">
                {categories.map((category: Category) => (
                    <React.Fragment key={category.id}>
                        <div className="dropdown dropdown-hover dropdown-left dropdown-end">
                            <label tabIndex={0}>
                                <Facet
                                    id={category.id}
                                    name={category.name}
                                    onCategoryClick={onFacetClick}
                                />
                            </label>
                            {category.children && category.children.length > 0 && (
                                <ul tabIndex={0}
                                    className="dropdown-content menu shadow bg-base-200 rounded-box w-52">
                                    {renderCategories(category.children, onFacetClick)}
                                </ul>
                            )}
                        </div>
                    </React.Fragment>
                ))}
            </ul>
        );
    };
    return renderCategories(categories, onFacetClick);
};

export default Facets;