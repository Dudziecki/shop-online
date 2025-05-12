import { Poster } from "@/components/Poster/Poster.tsx";
import { Products } from "@/components/Products/Products.tsx";
import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
import { selectProducts } from "@/features/products/model/productsSlice.ts";
import s from "./Home.module.css";
import { Categories } from "@/components/Categories/Categories.tsx"
import { selectCategory } from "@/features/categories/model/categoriesSlice.ts"
import { Banner } from "@/components/Banner/Banner.tsx"

export const Home = () => {
  const products = useAppSelector(selectProducts);
  const categories = useAppSelector(selectCategory);
  debugger
  return (
    <div className={s.homeContainer}>
      {/*<Poster />*/}
      {/*<div className={s.productsContainer}>*/}
        <Products products={products} amount={5} title="Trending" />
        <Categories categories={categories} amount={5} title="Worth seeing"/>
      <Banner/>
      {/*</div>*/}
    </div>
  );
};