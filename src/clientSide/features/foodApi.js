import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const foodApi = createApi({
    reducerPath: "foodApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/" }),
    endpoints: (builder) => ({
        getAllFood: builder.query({
            query: () => `clientSideFood`,
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllFoodQuery } = foodApi;