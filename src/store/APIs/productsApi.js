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
        baseUrl: 'http://localhost:8080/api',
        fetchFn: async (...args) => {
            await delay(500);
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
                query: ({page, filters}) => {
                    return {
                        url: '/products',
                        params: createParams(page, filters),
                        method: 'GET'
                    }
                }
            }),
        }
    }
})

export { productsApi }
export const {useFetchProductsQuery, useFetchFilteredProductsQuery} = productsApi