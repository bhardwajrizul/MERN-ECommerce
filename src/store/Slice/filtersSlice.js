import { createSlice } from "@reduxjs/toolkit";

const GENDERS = {
    MALE: 'Male',
    FEMALE: 'Female',
    UNISEX: 'Unisex'
}

const [MAX_PRICE, MIN_PRICE, STEP] = [5001, 1, 500]

const filtersApplied = {
    price: false,
    selectedCategories: false,
    discount: false,
    gender: false,
    rating: false
}

const filtersSlice = createSlice({
    name: 'filter',
    initialState: {
        price: {
            max: MAX_PRICE,
            min: MIN_PRICE,
            step: STEP
        },
        selectedCategories: [],
        discount: 0,
        gender: '',
        rating: 0,
        countFiltersApplied: {
            ...filtersApplied
        }
    },
    reducers: {
        setMaxPrice(state, action) {
            state.price.max = action.payload;
            state.countFiltersApplied.price =
                state.price.max === MAX_PRICE && state.price.min === MIN_PRICE
                    ? false : true
        },
        setMinPrice(state, action) {
            state.price.min = action.payload;
            state.countFiltersApplied.price =
                state.price.max === MAX_PRICE && state.price.min === MIN_PRICE
                    ? false : true

        },
        resetPrice(state, action) {
            state.price.min = MIN_PRICE
            state.price.max = MAX_PRICE
            state.countFiltersApplied.price = false;

        },
        setSelectedCategories(state, action) {
            const index = state.selectedCategories.indexOf(action.payload);
            if (index === -1) {
                // If category is not present, add it
                state.selectedCategories.push(action.payload);
            } else {
                // If category is present, remove it
                state.selectedCategories.splice(index, 1);
            }
            state.countFiltersApplied.selectedCategories =
                state.selectedCategories.length > 0
                    ? true : false
        },
        setDiscount(state, action) {
            state.discount = action.payload;
            state.countFiltersApplied.discount = true
        },
        resetDiscount(state, action) {
            state.discount = 0
            state.countFiltersApplied.discount = false
        },
        setGender(state, action) {
            state.gender = action.payload;
            state.countFiltersApplied.gender = true
        },
        resetGender(state, action) {
            state.gender = ''
            state.countFiltersApplied.gender = false

        },
        setRating(state, action) {
            state.rating = action.payload;
            state.countFiltersApplied.rating = state.rating == 0 ? false : true
        },
        resetRating(state, action) {
            state.rating = 0
            state.countFiltersApplied.rating = false
        },
        resetCategories(state, action) {
            state.selectedCategories = [];
            state.countFiltersApplied.selectedCategories = false
        },
        resetAll(state, action) {
            state.discount = 0
            state.gender = ''
            state.rating = 0
            state.price.min = MIN_PRICE
            state.price.max = MAX_PRICE
            state.selectedCategories = []
            state.countFiltersApplied = {...filtersApplied}
        }
    }
});

// Export the reducer and actions
export const {
    setMaxPrice,
    setMinPrice,
    setSelectedCategories,
    setDiscount,
    setGender,
    setRating,
    resetPrice,
    resetDiscount,
    resetGender,
    resetRating,
    resetCategories,
    resetAll

} = filtersSlice.actions;

export { MAX_PRICE, MIN_PRICE, STEP };
export default filtersSlice.reducer;
