import { configureStore } from '@reduxjs/toolkit'
import { categoriesReducer, categoriesSlice } from "@/features/categories/model/categoriesSlice.ts"
import { productsReducer, productsSlice } from "@/features/products/model/productsSlice.ts"
import { productApi } from "@/features/products/product/productApi.ts"

export const store = configureStore({
  reducer: {
    [categoriesSlice.name]: categoriesReducer,
    [productsSlice.name]: productsReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(productApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch