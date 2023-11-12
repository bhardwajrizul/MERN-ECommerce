import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

function delay(duration) {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'http://localhost:8080/api', // DEV
        baseUrl: 'https://mern-ecommerce-api-nzid.onrender.com/api', // PROD
        fetchFn: async (...args) => {
            await delay(500); // DEV
            return fetch(...args)
        },
    }),
    endpoints(builder) {
        return {
            addUser: builder.mutation({
                query: (newUserData) => {
                    return {
                        url: 'users/addUser',
                        body: newUserData,
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${newUserData.token}`
                        }
                    }
                }
            }),
            getUser: builder.query({
                providesTags: ['Update'],
                query: (userData) => {
                    return {
                        url: `users/${userData.uid}`,
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${userData.token}`
                        }
                    }
                }
            }),
            // Expects Name and Phone Number in request.updateData
            updateUserData: builder.mutation({
                invalidatesTags: ['Update'],
                query: (request) => {
                    return {
                        url: `users/${request.uid}`,
                        method: 'PATCH',
                        body: request.updateData,
                        headers: {
                            Authorization: `Bearer ${request.token}`
                        }
                    }
                }
            }),
            getWishlistItems: builder.query({
                providesTags: ['Wishlist'],
                query: ({ uid, token }) => {
                    return {
                        url: `users/${uid}/wishList`,
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                }
            }),
            addToWishList: builder.mutation({
                invalidatesTags: ['Wishlist'],
                query: ({ uid, pid, token, quantity, size = null }) => {
                    return {
                        url: `users/${uid}/wishList`,
                        method: 'POST',
                        body: { pid, quantity, size },
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                }
            }),
            RemoveItemFromWishList: builder.mutation({
                invalidatesTags: ['Wishlist'],
                query: ({ uid, pid, token, size = null }) => {
                    return {
                        url: `users/${uid}/wishList`,
                        method: 'DELETE',
                        body: { pid, size },
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                }
            }),
            getCartItems: builder.query({
                providesTags: ['Cart'],
                query: ({ uid, token }) => {
                    return {
                        url: `users/${uid}/cart`,
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                }
            }),
            addToCart: builder.mutation({
                invalidatesTags: ['Cart'],
                query: ({ uid, pid, token, quantity, size = null }) => {
                    return {
                        url: `users/${uid}/cart`,
                        method: 'POST',
                        body: { pid, quantity, size },
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                }
            }),
            removeItemFromCart: builder.mutation({
                invalidatesTags: ['Cart'],
                query: ({ uid, pid, token, size = null }) => {
                    return {
                        url: `users/${uid}/cart`,
                        method: 'DELETE',
                        body: { pid, size },
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                }
            }),
            getOrders: builder.query({
                providesTags: ['Order'],
                query: ({ uid, token }) => {
                    return {
                        url: `users/${uid}/orders`,
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                }
            })

        }
    },
});

export { usersApi };
export const {
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
} = usersApi;

export const { getCartItems } = usersApi.endpoints.getCartItems;
