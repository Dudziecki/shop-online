import { NavLink } from "react-router-dom"
import { ROUTES } from "@/common/utils/Routes.ts"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { selectCategory } from "@/features/categories/model/categoriesSlice.ts"
import { useEffect } from "react"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { getCategoriesTC } from "@/features/categories/model/categoriesSlice.ts"
import styles from "./Sidebar.module.css"

export const Sidebar = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectCategory)
  const isLoading = useAppSelector(state => state.categories.isLoading)

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategoriesTC())
    }
  }, [dispatch, categories.length])

  const displayedCategories = categories.slice(0, 5);

  return (
    <section className={styles.sidebar}>
      <div className={styles.title}>CATEGORIES</div>
      <nav>
        {isLoading ? (
          <ul className={styles.menu}>
            {[...Array(5)].map((_, i) => (
              <div key={i} className={styles.skeletonLink}></div>
            ))}
          </ul>
        ) : (
          <ul className={styles.menu}>
            {displayedCategories.map(category => (
              <NavLink
                key={category.id}
                to={`/categories/${category.id}`}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                {category.name}
              </NavLink>
            ))}
            {categories.length > 5 && (
              <div className={styles.more}>...</div>
            )}
          </ul>
        )}
      </nav>
      <div className={styles.footer}>
        <NavLink to={ROUTES.HELP} className={styles.help}>Help</NavLink>
        <NavLink to={ROUTES.TERMS} className={styles.help}>Terms & Conditions</NavLink>
      </div>
    </section>
  )
}