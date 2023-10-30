import Panel from "../Panel";
import StyleSpan from "../StyleSpan";
import Button from "../Button";
import PriceFilter from "./components/PriceFilter";
import CategoryFilter from "./components/CategoryFilter";
import DiscountFilter from "./components/DiscountFilter";
import GenderFilter from "./components/GenderFilter";
import RatingFilter from "./components/RatingFilter";
import { useDispatch, useSelector } from "react-redux";
import { resetAll } from "../../store";

function FilterContainer() {
    let filtersApplied = false;

    const dispatch = useDispatch()
    const { filters } = useSelector((state) => {
        return {
            filters: state.filters.countFiltersApplied
        }
    })

    Object.keys(filters).forEach(key => {
        filtersApplied = filtersApplied || filters[key] // If a filter is true it will set filtersApplied to true
    });

    return (
        <Panel
            className="w-72 sticky top-8 pb-[8rem] max-h-screen bg-base-100 rounded overflow-y-auto">
            <Panel className='bg-base-100 shadow-sm border flex flex-col py-1 rounded-full mb-2'>
                <h1 className="text-2xl font-h-b my-1 ml-2 text-center">
                     Filters 
                </h1>
            </Panel>
            <PriceFilter />
            <CategoryFilter />
            <DiscountFilter />
            <GenderFilter />
            <RatingFilter />
            {
                filtersApplied &&
                <Button
                    dark
                    className='text-xs w-full mt-2'
                    onClick={() => dispatch(resetAll())}>
                    Remove Filters
                </Button>
            }
        </Panel>
    )
}


export default FilterContainer;