import { Route, Routes } from "react-router-dom"
import { ROUTES } from "@/common/utils/Routes.ts"
import { Home } from "../Home/Home.tsx"
import { SingleProduct } from "@/components/Products/SingleProduct/SingleProduct.tsx"
import { SingleCategory } from "@/components/Categories/SingleCategory.tsx"
import { Cart } from "@/components/Cart/Cart.tsx"
import { Favourites } from "@/components/Favourites/Favourites.tsx"
import { HelpPage } from "@/components/HelpPage/HelpPage.tsx"
import { ShopNowProduct } from "@/components/ShopNowProduct/ShowNowProduct.tsx"
import { ProfileForm } from "@/components/User/ProfileForm/ProfileForm.tsx"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.PRODUCT} element={<SingleProduct />} />
      <Route path={ROUTES.PROFILE} element={<ProfileForm />} />
      <Route path={ROUTES.CATEGORIES} element={<SingleCategory/>} />
      <Route path={ROUTES.CART} element={<Cart/>} />
      <Route path={ROUTES.FAVOURITES} element={<Favourites/>} />
      <Route path={ROUTES.HELP} element={<HelpPage/>} />
      <Route path={ROUTES.MAINPRODUCT} element={<ShopNowProduct/>} />
    </Routes>
  )
}
