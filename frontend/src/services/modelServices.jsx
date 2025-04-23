
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { server } from "./service"
import { notify } from "../utils/notification"
const baseQuery = fetchBaseQuery({
    baseUrl: `${server}/api/models`,
    credentials: "include",
    // prepareHeaders: (headers) => {
    //     headers.set("Content-Type", "application/json")
    //     return headers
    // },
})

const modelApi = createApi({

    baseQuery,
    reducerPath: "modelApi",
    tagTypes: ["Model"],
    endpoints: (builder) => ({
        uploadModel: builder.mutation({
            query: (data) => ({
                url: "/upload",
                method: "POST",
                body: data,
                credentials:"include"
                // headers: {
                //     "Content-Type": "multipart/form-data",
                // },
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log(data,"data");
                    
                    notify({ message: data?.message || "Model Uploaded", type: "success", status: data?.status })
                } catch (err) {
                    const {data}=err?.error
                    console.log(err);
                    notify({ message:data?.message || "something wrong !!", type: "error", status: data?.status })
                }
            }
        }),

        getModels: builder.query({
            query: () => "/",
            providesTags: ["Model"],
        }),
        getModelById: builder.query({
            query: (id) => `/${id}`,
            providesTags: ["Model"],
        }),
        setCameraPosition: builder.mutation({
            query: (data) => ({
                url: "/camera",
                method: "POST",
                body: data,
                invalidatesTags: (result, error, { userId }) => [{ type: 'Camera', id: userId }],
            }),
            async onQueryStarted({ userId }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled


                    await dispatch(modelApi.endpoints.fetchCameraPosition.initiate(userId, { forceRefetch: true })).unwrap();
                    notify({ message: "Position Added", type: "success", status: data?.status })

                } catch (err) {
                    console.log(err);

                    notify({ message: "something wrong !!", type: "error", status: err?.status })

                }
            }
            // invalidatesTags:["Model"],
        }),

        fetchCameraPosition: builder.query({
            query: (id) => `/camera?userId=${id}`,
            method: "GET",
            providesTags: (result, error, id) => [{ type: 'Camera', id }],
            // providesTags:["Model"],
        }),

    })
})

export const { useSetCameraPositionMutation, useFetchCameraPositionQuery ,useUploadModelMutation,useGetModelsQuery} = modelApi
export { modelApi };