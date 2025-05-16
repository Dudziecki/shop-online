import { createAppSlice } from "@/common/hooks/createAppSlice.ts"
import type { Product } from "@/components/Products/types.ts"
import { productsApi } from "@/features/products/api/productsApi.ts"
import { shuffle } from "@/common/utils/shuffle.ts"


export const productsSlice = createAppSlice({
  name: "products",
  initialState: {
    list: [] as Product[],
    isLoading: false ,
    filtered:[] as Product[],
    related:[]as Product[]
  },
  selectors:{
    selectProducts:state=>state.list,
    selectFilteredProducts:state=>state.filtered,
    selectRelatedProducts:state=>state.related
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

        },

      },

    ),
    filterByPrice:create.reducer<number>((state, action)=>{
      state.filtered= state.list.filter(product=>product.price < action.payload)
    }),
    getRelatedProducts:create.reducer<number>((state, action)=>{
      const list= state.list.filter(product=>product.category.id === action.payload)
      state.related=shuffle(list)
    })
  })
})
export const { getProductsTC,filterByPrice,getRelatedProducts} = productsSlice.actions
export const {selectProducts,selectFilteredProducts,selectRelatedProducts}=productsSlice.selectors
export const productsReducer = productsSlice.reducer