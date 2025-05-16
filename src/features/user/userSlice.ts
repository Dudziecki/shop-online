import { createAppSlice } from "@/common/hooks/createAppSlice.ts"
import type { Product } from "@/features/products/api/productsApi.types.ts"
import { userApi } from "@/features/user/api/userApi.ts"
import type { UserBody } from "@/features/user/api/userApi.types.ts"

interface CartItem extends Pick<Product, "id"> {
  quantity: number;
  product: Product; // сохраняем всю информацию о продукте
}

interface UserState {

  isLoading: boolean;
  cart: CartItem[];
}

export const userSlice = createAppSlice({
  name: "user",
  initialState: {
    currentUser: {} as UserBody,
    isLoading: false,
    cart: [] as CartItem[]
  },
  selectors: {},
  reducers: create => ({
    addItemToCart: create.reducer<{ product: Product, quantity?: number }>((state, action) => {
      const { product, quantity = 1 } = action.payload
      const existingItem = state.cart.find(item => item.id === product.id)

      if (existingItem) {
        state.cart = state.cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        state.cart.push({
          id: product.id,
          quantity,
          product
        })
      }
    }),
    registerUserTC: create.asyncThunk(async (args: UserBody, { rejectWithValue }) => {
      try {
        const res = await userApi.registerUser(args)
        return res.data
      } catch (err) {
        return rejectWithValue(err)
      }
    }, {
      fulfilled: (state, action) => {
        state.currentUser = action.payload
        //2.01
      }
    })
  })
})

export const { addItemToCart } = userSlice.actions
export const {} = userSlice.selectors
export const userReducer = userSlice.reducer