import { useState } from "react";
import { BsChevronLeft, BsChevronDown } from 'react-icons/bs'
import { useDispatch, useSelector } from "react-redux";
import { resetDiscount, setDiscount } from "../../../store";
import Button from "../../Button";
function DiscountFilter() {
    const [open, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { selectedDiscount, filterApplied } = useSelector((state) => {
        return {
            selectedDiscount: state.filters.discount,
            filterApplied: state.filters.countFiltersApplied.discount
        }
    })
    const discounts = [50, 40, 30, 20, 10];

    const handleDiscountChange = (e) => {
        dispatch(setDiscount(e.target.value));
    }
    const changeDiscount = (discount) => {
        dispatch(setDiscount(discount));
    }
    const handleResetDiscount = () => dispatch(resetDiscount())

    return (
        <details className="collapse bg-white border flex flex-col ">
            <summary onClick={() => setIsOpen((prev) => !prev)} className="collapse-title px-2">
                <div className="flex flex-row text-2xl font-h-b items-center justify-between">
                    <div className={`text-2xl ${filterApplied ? 'font-h-b' : 'font-h'}`}>
                        Discount Amount
                    </div>
                    {open ? <BsChevronDown className="text-sm text-bold" /> : <BsChevronLeft className="text-sm text-bold" />}
                </div>
            </summary>
            <div className="collapse-content">
                {open && discounts.map((discount, index) => (
                    <div key={index} className="category-item px-2 py-1 flex flex-row items-center">
                        <input
                            type="radio"
                            name={`radio-discount}`}
                            className="radio radio-secondary mr-2"
                            value={discount}              // Set the value to the category name
                            onChange={handleDiscountChange}  // Handle the change event
                            checked={selectedDiscount === discount}  // Check if this category is the selected one
                        />
                        <button className="text-start" onClick={() => changeDiscount(discount)}>
                            {discount}% or more!
                        </button>
                    </div>
                ))}
            </div>
            {
                filterApplied &&
                <Button dark className='ml-auto mr-4 mb-3' onClick={handleResetDiscount}>
                    Clear
                </Button>
            }
        </details>
    )
}

export default DiscountFilter;
