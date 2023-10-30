import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'http://localhost:8080/api', // DEV
        baseUrl: 'https://mern-ecommerce-api-nzid.onrender.com/api', // PROD
        fetchFn: async (...args) => {
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
            })
        }
    },
});

export { usersApi };
export const { useAddUserMutation } = usersApi;
