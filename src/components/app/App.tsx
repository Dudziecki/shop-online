import { AppRoutes } from "../routes/routes.tsx"
import "./App.css"
import { Header } from "../Header/Header.tsx"
import { Sidebar } from "../Sidebar/Sidebar.tsx"
import { Footer } from "../Footer/Footer.tsx"
import { Poster } from "@/components/Poster/Poster.tsx"
import { Home } from "@/components/Home/Home.tsx"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { useEffect } from "react"
import { getCategoriesTC } from "@/features/categories/model/categoriesSlice.ts"
import { getProductsTC } from "@/features/products/model/productsSlice.ts"

export const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getCategoriesTC())
    dispatch(getProductsTC())
  }, [dispatch])
  return (
    <div className="App">
      <Header />

      <div className="wrapper">
        <Sidebar />
        {/*<AppRoutes />*/}
        <Poster/>

      </div>
      <AppRoutes/>

      <Footer />
    </div>
  )

}