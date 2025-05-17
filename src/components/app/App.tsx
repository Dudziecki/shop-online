import { AppRoutes } from "../routes/routes.tsx"
import "./App.css"
import { Header } from "../Header/Header.tsx"
import { Sidebar } from "../Sidebar/Sidebar.tsx"
import { Footer } from "../Footer/Footer.tsx"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { useEffect } from "react"
import { getCategoriesTC } from "@/features/categories/model/categoriesSlice.ts"
import { getProductsTC } from "@/features/products/model/productsSlice.ts"
import { Home } from "@/components/Home/Home.tsx"
import { UserForm } from "@/components/User/UserForm.tsx"
import { checkAuth } from "@/features/user/userSlice.ts"

export const App = () => {

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(checkAuth())
    dispatch(getCategoriesTC())
    dispatch(getProductsTC())
  }, [dispatch])
  return (
    <div className="App">
      <Header />
      <UserForm/>
      <div className="wrapper">

        <AppRoutes />

      </div>
      <Footer />
    </div>
  )

}