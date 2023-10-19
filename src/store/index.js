import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { productsApi } from "./APIs/productsApi";
import {
    productsReducer,
    pushNewProductsToPage,
    showMoreProducts,
    resetProductsAndPage
} from "./Slice/productsSlice";
import {
    filtersReducer,
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
    resetAll,

} from './Slice/filtersSlice';

const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        products: productsReducer,
        filters : filtersReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(productsApi.middleware)
    }
})

setupListeners(store.dispatch);

export { 
    store,
    pushNewProductsToPage ,
    showMoreProducts,
    resetProductsAndPage,
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
}
export {
    useFetchProductsQuery,
    useFetchFilteredProductsQuery
} from './APIs/productsApi'