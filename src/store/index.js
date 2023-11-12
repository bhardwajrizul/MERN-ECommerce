import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { productsApi } from "./APIs/productsApi";
import { usersApi } from "./APIs/usersApi";
import { ordersApi } from "./APIs/ordersApi";

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
    setUserLoading,
    setToken
} from './Slice/userSlice'

import productInfoReducer, {
    setProductInfo,
    updateProductInfo,
    resetProductInfo
} from "./Slice/productInfoSlice";

const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
        products: productsReducer,
        productInfo: productInfoReducer,
        filters: filtersReducer,
        form: formReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(productsApi.middleware)
            .concat(usersApi.middleware)
            .concat(ordersApi.middleware)
    }
})

setupListeners(store.dispatch);

export {
    store,
    pushNewProductsToPage,
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
    setToken,
    setUserLoading,
    resetForm,
    setProductInfo,
    updateProductInfo,
    resetProductInfo,
}
export {
    useFetchProductsQuery,
    useFetchFilteredProductsQuery,
    useFetchProductInfoQuery
} from './APIs/productsApi'

export {
    useAddUserMutation,
    useGetUserQuery,
    useUpdateUserDataMutation,
    useAddToWishListMutation,
    useGetWishlistItemsQuery,
    useRemoveItemFromWishListMutation,
    useGetCartItemsQuery,
    useRemoveItemFromCartMutation,
    useAddToCartMutation,
    useGetOrdersQuery
} from './APIs/usersApi'

export {
    usePlaceOrderMutation,
    useConfirmPaymentQuery
} from './APIs/ordersApi'