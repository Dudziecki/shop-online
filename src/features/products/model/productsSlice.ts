import { createAppSlice } from "@/common/hooks/createAppSlice.ts"
import type { Product } from "@/components/Products/types.ts"
import { productsApi } from "@/features/products/api/productsApi.ts"


export const productsSlice = createAppSlice({
  name: "products",
  initialState: {
    list: [] as Product[],
    isLoading: false ,
    filtered:[] as Product[],
    related:[]
  },
  selectors:{
    selectProducts:state=>state.list,
    selectFilteredProducts:state=>state.filtered
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

    ),
    filterByPrice:create.reducer<number>((state, action)=>{
      state.filtered= state.list.filter(product=>product.price < action.payload)
    })
  })
})
export const { getProductsTC,filterByPrice} = productsSlice.actions
export const {selectProducts,selectFilteredProducts}=productsSlice.selectors
export const productsReducer = productsSlice.reducer