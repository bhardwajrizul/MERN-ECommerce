import { useState } from "react";
import { BsChevronLeft, BsChevronDown } from 'react-icons/bs';
import { useSelector, useDispatch } from "react-redux";
import { resetCategories, setSelectedCategories } from "../../../store";

import Button from "../../Button";

function CategoryFilter() {
    const categories = ['Electronics', 'Fashion', 'Home & Living', 'Beauty & Health', 'Books & Stationery', 'Other'];

    const dispatch = useDispatch();

    const [open, setIsOpen] = useState(false);

    const { selectedCategories, filterApplied } = useSelector((state) => {
        return {
            selectedCategories: state.filters.selectedCategories,
            filterApplied: state.filters.countFiltersApplied.selectedCategories
        }
    })

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        dispatch(setSelectedCategories(value));
    };
    const handleResetCategories = () => dispatch(resetCategories())

    return (
        <details className={`collapse border flex flex-col bg-white`}>
            <summary onClick={() => setIsOpen((prev) => !prev)} className="collapse-title px-2">
                <div className="flex flex-row text-2xl font-h-b items-center justify-between">
                    <div className={`text-2xl ${filterApplied ? 'font-h-b' : 'font-h'}`}>
                        Category
                    </div>
                    {open ? <BsChevronDown className="text-sm text-bold" /> : <BsChevronLeft className="text-sm text-bold" />}
                </div>
            </summary>
            <div className="collapse-content">
                {open && categories.map((category, index) => (
                    <div key={index} className="category-item px-2 py-1 flex flex-row items-center">
                        <input
                            id={category}
                            type="checkbox"
                            className="checkbox checkbox-secondary mr-2 rounded-lg"
                            value={category}
                            onChange={handleCategoryChange}
                            checked={selectedCategories.includes(category)}
                        />
                        <label htmlFor={category} className="text-start">{category}</label> {/* Label added to improve UX */}
                    </div>
                ))}
            </div>
            {
                filterApplied &&
                <Button dark className='ml-auto mr-4 mb-3' onClick={handleResetCategories}>
                    Clear
                </Button>
            }
        </details>
    )
}

export default CategoryFilter;
