import { useState } from "react";
import { BsChevronLeft, BsChevronDown } from 'react-icons/bs'
import { CiStar } from 'react-icons/ci'
import { useSelector, useDispatch } from "react-redux";
import { resetRating, setRating } from "../../../store";
import Button from "../../Button";
function RatingFilter() {
    const [open, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const [min, max, step] = [1, 5, 1];
    const { rating, filterApplied } = useSelector((state) => {
        return {
            rating: state.filters.rating,
            filterApplied: state.filters.countFiltersApplied.rating
        }
    })

    const handleRatingChange = (e) => {
        const newValue = Number(e.target.value);
        dispatch(setRating(newValue));
    };

    const handleResetRating = () => dispatch(resetRating())

    return (
        <details className="collapse bg-white border flex flex-col py-4">
            <summary onClick={() => setIsOpen(prev => !prev)} className="px-2">
                <div className="flex flex-row text-2xl font-h-b items-center justify-between">
                    <div className={`text-2xl ${filterApplied ? 'font-h-b' : 'font-h'}`}>
                        Min Rating
                    </div>
                    {open ? <BsChevronDown className="text-sm text-bold" /> : <BsChevronLeft className="text-sm text-bold" />}
                </div>
            </summary>
            <div className="collapse-content px-2">
                {open && (
                    <div>
                        <div className="container-rating">
                            <input
                                type="range"
                                min={min}
                                max={max}
                                value={rating}
                                className="range range-xs"
                                step={step}
                                onChange={handleRatingChange}
                            />
                            <div className="flex flex-row items-center justify-start">
                                <h1 className="font-t-b text-sm p-2">Rating : </h1>
                                <h1 className="font-t text-md flex flex-row items-center justify-center">
                                    <div className="mt-1 text-xl">
                                        {rating === max ? rating : `${rating}+`}
                                    </div>
                                    <CiStar className="text-2xl" />

                                </h1>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {
                filterApplied &&
                <Button dark className='ml-auto mr-4 mb-3' onClick={handleResetRating}>
                    Clear
                </Button>
            }
        </details>
    )
}

export default RatingFilter;
