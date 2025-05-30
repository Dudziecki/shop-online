import { Route, Routes } from "react-router-dom"
import { ROUTES } from "@/common/utils/Routes.ts"
import { Home } from "../Home/Home.tsx"
import { App } from "@/components/app/App.tsx"
import { SingleProduct } from "@/components/Products/SingleProduct.tsx"
import { Profile } from "@/components/Profile/Profile.tsx"
import { SingleCategory } from "@/components/Categories/SingleCategory.tsx"
import { Cart } from "@/components/Cart/Cart.tsx"
import { Favourites } from "@/components/Favourites/Favourites.tsx"
import { HelpPage } from "@/components/HelpPage/HelpPage.tsx"
import { ShowNowProduct } from "@/components/ShopNowProduct/ShowNowProduct.tsx"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.PRODUCT} element={<SingleProduct />} />
      <Route path={ROUTES.PROFILE} element={<Profile />} />
      <Route path={ROUTES.CATEGORIES} element={<SingleCategory/>} />
      <Route path={ROUTES.CART} element={<Cart/>} />
      <Route path={ROUTES.FAVOURITES} element={<Favourites/>} />
      <Route path={ROUTES.HELP} element={<HelpPage/>} />
      <Route path={ROUTES.MAINPRODUCT} element={<ShowNowProduct/>} />
    </Routes>
  )
}
