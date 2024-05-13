import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { createParams } from '../../utils/createParams';

function delay(duration) {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'http://localhost:8080/api', // DEV
        baseUrl: 'https://mern-ecommerce-api-nzid.onrender.com/api', // PROD
        fetchFn: async (...args) => {
            // await delay(500); // DEV to simulate network delay
            return fetch(...args)
        }
    }),
    endpoints(builder) {
        return {
            fetchProducts: builder.query({
                query: (page) => {
                    return {
                        url: '/products',
                        params: {
                            page: page
                        },
                        method: 'GET'
                    }
                }
            }),
            fetchFilteredProducts: builder.query({
                query: ({page, filters, searchQuery=null}) => {
                    return {
                        url: '/products',
                        params: createParams(page, filters, searchQuery),
                        method: 'GET'
                    }
                }
            }),
            fetchProductInfo: builder.query({
                query: (pid) => {
                    return {
                        url: `/products/${pid}`,
                        method: 'GET'
                    }
                }
            })
        }
    }
})

export { productsApi }
export const {
    useFetchProductsQuery,
    useFetchFilteredProductsQuery,
    useFetchProductInfoQuery
} = productsApi