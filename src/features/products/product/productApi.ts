import { type BaseQueryArg, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "@/common/constants/constants.ts"
import type { Product } from "@/components/Products/types.ts"

export const productApi = createApi({
  reducerPath: "product",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    getProduct: builder.query<Product, { id?:string }>({
      query:({id})=>`/products/${id}`,
      providesTags:['product']
    })
  })
})
export const {useGetProductQuery}=productApi