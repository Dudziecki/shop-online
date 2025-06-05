import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { Products } from "@/components/Products/Products/Products.tsx"
import { selectFavorites } from "@/features/products/model/productsSlice.ts"
import styles from "./Favourites.module.css"

export const Favourites = () => {
  const favorites = useAppSelector(selectFavorites)

  return (
    <section className={styles.favorites}>
      <h2 className={styles.title}>Your Favorites</h2>

      {favorites.length === 0 ? (
        <div className={styles.empty}>
          <span>Your favorites list is empty</span>
          <p>Add items to your favorites to see them here</p>
        </div>
      ) : (
        <Products
          products={favorites}
          title=""
          styles={{ padding: 0 }}
          amount={favorites.length}
        />
      )}
    </section>
  )
}