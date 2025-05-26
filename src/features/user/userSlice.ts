import { createAppSlice } from "@/common/hooks/createAppSlice.ts"
import type { Product } from "@/features/products/api/productsApi.types.ts"
import { userApi } from "@/features/user/api/userApi.ts"
import type { UpdateRequest, UserBody, UserLogin, UserResponse } from "@/features/user/api/userApi.types.ts"

interface CartItem extends Pick<Product, "id"> {
  quantity: number;
  product: Product;
}

interface UserState {
  currentUser: UserBody | null;
  isLoading: boolean;
  cart: CartItem[];
  formType: "signup" | "login";
  showForm: boolean;
  error: string | null;
}

export const userSlice = createAppSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isLoading: false,
    cart: [],
    formType: "signup",
    showForm: false,
    error: null
  } as UserState,
  selectors: {
    selectShowForm: state => state.showForm,
    selectCurrentUser: state => state.currentUser,
    selectFormType: state => state.formType,
    selectError: state => state.error,
    selectIsLoading: state => state.isLoading,
    selectCart:state=>state.cart

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
      state.error = null
    }),
    toggleFormType: create.reducer<{ formType: "signup" | "login" }>((state, action) => {
      state.formType = action.payload.formType
      state.error = null
    }),
    logout: create.reducer((state) => {
      state.currentUser = null
      localStorage.removeItem('token')
    }),
    registerUserTC: create.asyncThunk(async (args: UserBody, { rejectWithValue }) => {
      try {
        const res = await userApi.registerUser(args)
        return res.data
      } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Registration failed')
      }
    }, {
      pending: (state) => {
        state.isLoading = true
        state.error = null
      },
      fulfilled: (state, action) => {
        state.currentUser = action.payload
        state.isLoading = false
        state.showForm = false
      },
      rejected: (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      }
    }),
    updateUserTC: create.asyncThunk(async(arg: UpdateRequest, {rejectWithValue}) => {
      try {
        const res = await userApi.updateUser(arg)
        return res.data
      } catch (e: any) {
        return rejectWithValue(e.response?.data?.message || 'Update failed')
      }
    }, {
      pending: (state) => {
        state.isLoading = true
      },
      fulfilled: (state, action) => {
        state.currentUser = action.payload
        state.isLoading = false
      },
      rejected: (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      }
    }),
    loginUserTC: create.asyncThunk(async (arg: UserLogin, { rejectWithValue }) => {
      debugger
      try {
        const loginResponse = await userApi.loginUser({
          email: arg.email,
          password: arg.password
        })
        if (!loginResponse.data?.access_token) {
          throw new Error('No token received');
        }
        const { access_token } = loginResponse.data

        localStorage.setItem('token', access_token)
        console.log('Token saved:', localStorage.getItem('token'));
        const userResponse = await userApi.getUser(access_token)

        return userResponse.data
      } catch (e: any) {
        console.error('Login error:', e.response?.data || e.message);
        return rejectWithValue(e.response?.data?.message || 'Login failed')
      }
    }, {
      pending: (state) => {
        state.isLoading = true
        state.error = null
      },
      fulfilled: (state, action) => {
        state.currentUser = action.payload
        state.isLoading = false
        state.showForm = false
      },
      rejected: (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      }
    }),
    checkAuth: create.asyncThunk(async (_, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('No token found')

        const response = await userApi.getCurrentUser()
        return response.data
      } catch (e: any) {
        localStorage.removeItem('token')
        return rejectWithValue(e.response?.data?.message || 'Auth check failed')
      }
    }, {
      pending: (state) => {
        state.isLoading = true
      },
      fulfilled: (state, action) => {
        state.currentUser = action.payload
        state.isLoading = false
      },
      rejected: (state) => {
        state.isLoading = false
        state.currentUser = null
      }
    }),
  })
})

export const {
  addItemToCart,
  toggleForm,
  registerUserTC,
  loginUserTC,
  toggleFormType,
  checkAuth,
  updateUserTC,
  logout
} = userSlice.actions

export const {
  selectShowForm,
  selectCurrentUser,
  selectFormType,
  selectError,
  selectIsLoading,
  selectCart
} = userSlice.selectors

export const userReducer = userSlice.reducer