import { useState } from "react";
import { BsChevronLeft, BsChevronDown } from 'react-icons/bs'
import { MAX_PRICE, MIN_PRICE, STEP } from "../../../store/Slice/filtersSlice";
import { useSelector, useDispatch } from "react-redux";
import { setMaxPrice, setMinPrice, resetPrice } from "../../../store/index";
import Button from "../../Button";

function PriceFilter() {
    const [open, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const [min, max, step] = [MIN_PRICE, MAX_PRICE, STEP];
    const { minValue, maxValue, filterApplied } = useSelector((state) => {
        return {
            minValue: state.filters.price.min,
            maxValue: state.filters.price.max,
            filterApplied: state.filters.countFiltersApplied.price
        }
    })

    const handleMaxChange = (e) => {
        const newValue = Number(e.target.value);
        if (newValue > minValue) {
            dispatch(setMaxPrice(newValue));
        }
    };

    const handleMinChange = (e) => {
        const newValue = Number(e.target.value);
        if (newValue < maxValue) {
            dispatch(setMinPrice(newValue));
        }
    };

    const handleResetPrice = () => dispatch(resetPrice())

    return (
        <details className="collapse bg-white border flex flex-col py-4">
            <summary onClick={() => setIsOpen(prev => !prev)} className="px-2">
                <div className="flex flex-row text-2xl font-h-b items-center justify-between">
                    <div className={`text-2xl ${filterApplied ? 'font-h-b' : 'font-h'}`}>
                        Price Range
                    </div>
                    {open ? <BsChevronDown className="text-sm text-bold" /> : <BsChevronLeft className="text-sm text-bold" />}
                </div>
            </summary>
            <div className="collapse-content px-2">
                {open && (
                    <div>
                        <div className="container-min">
                            <div className="flex flex-row items-center justify-start">
                                <h1 className="font-t-b text-sm p-2">Min Price : </h1>
                                <h1 className="font-t text-md">{minValue - 1 === 0 ? 1 : minValue - 1}</h1>
                            </div>
                            <input
                                type="range"
                                min={min}
                                max={max}
                                value={minValue}
                                className="range range-xs"
                                step={step}
                                onChange={handleMinChange}
                            />
                        </div>
                        <div className="container-max">
                            <div className="flex flex-row items-center justify-start">
                                <h1 className="font-t-b text-sm p-2">Max Price : </h1>
                                <h1 className="font-t text-md">{maxValue === max ? `${max - 1}+` : maxValue - 1}</h1>
                            </div>
                            <input
                                type="range"
                                min={min}
                                max={max}
                                value={maxValue}
                                className="range range-xs"
                                step={step}
                                onChange={handleMaxChange}
                            />
                        </div>
                    </div>
                )}
            </div>

            {
                filterApplied &&
                <Button dark className='ml-auto mr-4' onClick={handleResetPrice}>
                    Clear
                </Button>
            }
        </details>
    )
}

export default PriceFilter;
