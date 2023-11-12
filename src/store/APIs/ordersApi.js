import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

function delay(duration) {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

const ordersApi = createApi({
    reducerPath: 'orderApi',
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
            placeOrder: builder.mutation({
                invalidatesTags: ['Order', 'Cart', 'Wishlist'],
                query: (orderDetails) => {
                    return {
                        url: '/order/placeOrder',
                        method: 'POST',
                        body: {
                            uid: orderDetails.uid
                        },
                        headers: {
                            Authorization: `Bearer ${orderDetails.userToken}`
                        }
                    }
                }
            }),
            confirmPayment: builder.query({
                invalidatesTags: ['Wishlist', 'Cart', 'Order'],
                query: ({oid, uid, userToken}) => {
                    return {
                        url: `/order/confirmOrder?order_id=${oid}&user_id=${uid}`,
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${userToken}`
                        }
                    }
                }
            })
        }
    }
})

export { ordersApi };
export const {
    usePlaceOrderMutation,
    useConfirmPaymentQuery
} = ordersApi