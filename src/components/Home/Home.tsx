import { Poster } from "@/components/Poster/Poster.tsx"
import { Products } from "@/components/Products/Products.tsx"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { filterByPrice, selectFilteredProducts, selectProducts } from "@/features/products/model/productsSlice.ts"
import s from "./Home.module.css"
import { Categories } from "@/components/Categories/Categories.tsx"
import { selectCategory } from "@/features/categories/model/categoriesSlice.ts"
import { Banner } from "@/components/Banner/Banner.tsx"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { useEffect } from "react"

export const Home = () => {
  const dispatch=useAppDispatch()
  const products = useAppSelector(selectProducts)
  const filteredProducts = useAppSelector(selectFilteredProducts)
  const categories = useAppSelector(selectCategory)
  useEffect(() => {
    if(!products.length)return
    dispatch(filterByPrice(50))
  },[dispatch,products])
  debugger
  return (
    <div className={s.homeContainer}>
      {/*<Poster />*/}
      {/*<div className={s.productsContainer}>*/}
      <Products products={products} amount={5} title="Trending" />
      <Categories categories={categories} amount={5} title="Worth seeing" />
      <Banner />
      <Products products={filteredProducts} amount={5} title="Less than 50$" />
      {/*</div>*/}
    </div>
  )
}