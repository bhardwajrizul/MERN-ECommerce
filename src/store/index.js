import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { productsApi } from "./APIs/productsApi";
import {
    productsReducer,
    pushNewProductsToPage,
    showMoreProducts,
    resetProductsAndPage
} from "./Slice/productsSlice";
import filtersReducer, {
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
import formReducer, { 
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    resetForm
} from "./Slice/formSlice";

import userReducer, {
    setUser,
    resetUser,
    setUserLoading
} from './Slice/userSlice'
import { usersApi } from "./APIs/usersApi";

const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        products: productsReducer,
        filters : filtersReducer,
        form: formReducer,
        user: userReducer
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
    resetAll,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    setUser,
    resetUser,
    setUserLoading,
    resetForm
}
export {
    useFetchProductsQuery,
    useFetchFilteredProductsQuery
} from './APIs/productsApi'

export {
    useAddUserMutation 
} from './APIs/usersApi'