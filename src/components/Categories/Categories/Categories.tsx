import React from "react"
import { Link } from "react-router-dom"
import type { Category } from "@/features/categories/api/categoriesApi.types.ts"
import styles from "./Categories.module.css"

export interface CategoriesProps {
  title?: string;
  categories: Category[];
  amount?: number;
}

export const Categories: React.FunctionComponent<CategoriesProps> = ({
                                                                       categories,
                                                                       title,
                                                                       amount
                                                                     }) => {
  const limit = amount ?? categories.length
  const list = categories.filter((_, i) => i < limit)

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.list}>
        {list?.map((category: Category) => (
          <Link
            key={category.id}
            to={`/categories/${category.id}`}
            className={styles.item}
          >
            <div
              className={styles.imageWrapper}
            >
              <div
                className={styles.image}
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <div className={styles.overlay}></div>
            </div>
            <h3 className={styles.name}>{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  )
}