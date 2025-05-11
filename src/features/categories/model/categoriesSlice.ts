import { createAppSlice } from "@/common/hooks/createAppSlice.ts"
import { categoriesApi } from "@/features/categories/api/categoriesApi.ts"
import type { Category } from "@/components/Products/types.ts"


export const categoriesSlice = createAppSlice({
  name: "categories",
  initialState: {
    list: [] as Category[],
    isLoading: false ,
  },
  selectors:({
    selectCategory:state=>state.list
  }),
  reducers: create => ({
    getCategoriesTC: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          const res = await categoriesApi.getCategories()
          return { categories: res.data  }
        } catch (err) {
          return rejectWithValue(null)
        }
      },
      {
        pending:(state, _) => {
          state.isLoading=true
        },
        fulfilled: (state, action) => {
          state.list = action.payload.categories
          state.isLoading=false
        },

      },

    )
  })
})
export const { getCategoriesTC } = categoriesSlice.actions
export const {selectCategory}=categoriesSlice.selectors
export const categoriesReducer = categoriesSlice.reducer