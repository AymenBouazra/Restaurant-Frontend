import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const notificationApi = createApi({
    reducerPath: "notificationApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/" }),
    endpoints: (builder) => ({
        getAllNotification: builder.query({
            query: () => `notification`,
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllNotificationQuery } = notificationApi;