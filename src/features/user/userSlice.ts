import { createAppSlice } from "@/common/hooks/createAppSlice.ts"
import type { Product } from "@/features/products/api/productsApi.types.ts"
import { userApi } from "@/features/user/api/userApi.ts"
import type { UserBody, UserLogin } from "@/features/user/api/userApi.types.ts"

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
    currentUser: null as UserBody | null,
    isLoading: false,
    cart: [] as CartItem[],
    formType: "signup",
    showForm: false
  },
  selectors: {
    selectShowForm: state => state.showForm,
    selectCurrentUser: state => state.currentUser,
    selectFormType: state => state.formType
  },
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
    toggleForm: create.reducer<{ isShow: boolean }>((state, action) => {
      state.showForm = action.payload.isShow
    }),
    toggleFormType: create.reducer<{ formType: string }>((state, action) => {
      state.formType = action.payload.formType
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
    }),
    loginUserTC: create.asyncThunk(async (arg: UserLogin, { rejectWithValue }) => {
      try {
        // 1. Логинимся и получаем токен
        const loginResponse = await userApi.loginUser(arg)
        const { access_token } = loginResponse.data

        localStorage.setItem('token', access_token);
        const userResponse = await userApi.getUser(access_token)

        return userResponse.data
      } catch (e) {
        return rejectWithValue(e)
      }
    }, {
      fulfilled: (state, action) => {
        state.currentUser = action.payload
      }
    }),
    checkAuth: create.asyncThunk(async (_, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await userApi.getCurrentUser();
        return response.data;
      } catch (e) {
        localStorage.removeItem('token'); // Удаляем невалидный токен
        return rejectWithValue(e);
      }
    }),

  })
})

export const { addItemToCart, toggleForm, registerUserTC, loginUserTC,toggleFormType,checkAuth} = userSlice.actions
export const { selectShowForm, selectCurrentUser, selectFormType } = userSlice.selectors
export const userReducer = userSlice.reducer