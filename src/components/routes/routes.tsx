import { Route, Routes } from "react-router-dom"
import { ROUTES } from "@/common/utils/Routes.ts"
import { Home } from "../Home/Home.tsx"
import { App } from "@/components/app/App.tsx"
import { SingleProduct } from "@/components/Products/SingleProduct.tsx"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index path={ROUTES.HOME} element={<Home/>}/>
      <Route  path={ROUTES.PRODUCT} element={<SingleProduct/>}/>
    </Routes>
  )
}
