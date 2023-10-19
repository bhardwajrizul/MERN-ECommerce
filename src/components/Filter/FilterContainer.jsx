import Panel from "../Panel";
import PriceFilter from "./components/PriceFilter";
import CategoryFilter from "./components/CategoryFilter";
import DiscountFilter from "./components/DiscountFilter";
import Button from "../Button";
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
        <Panel className="w-72 fixed pb-[8rem] max-h-screen bg-base-100 rounded overflow-y-auto">
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