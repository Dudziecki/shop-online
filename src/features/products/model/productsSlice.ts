import { createAppSlice } from "@/common/hooks/createAppSlice.ts"
import type { Product } from "@/components/Products/types.ts"
import { productsApi } from "@/features/products/api/productsApi.ts"


export const productsSlice = createAppSlice({
  name: "products",
  initialState: {
    list: [] as Product[],
    isLoading: false ,
    filtered:[],
    related:[]
  },
  selectors:{
    selectProducts:state=>state.list
  },
  reducers: create => ({
    getProductsTC: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {

          const res = await productsApi.getProducts()
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
          debugger
        },

      },

    )
  })
})
export const { getProductsTC } = productsSlice.actions
export const {selectProducts}=productsSlice.selectors
export const productsReducer = productsSlice.reducer