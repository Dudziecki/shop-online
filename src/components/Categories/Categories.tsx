import React from "react"
import s from "@/components/Products/Products.module.css"
import { Link } from "react-router-dom"
import type { Category } from "@/features/categories/api/categoriesApi.types.ts"

export interface CategoriesProps {
  title?: string;
  categories: Category[];
  amount?: number; // amount теперь может быть undefined
}

export const Categories: React.FunctionComponent<CategoriesProps> = ({ categories, title, amount }) => {
  const limit = amount ?? categories.length
  const list = categories.filter((_, i) => i < limit)
  return (
    <section className={s.section}>
      <h2>{title}</h2>
      <div className={s.list}>
        {list?.map((category: Category) => (
          <Link key={category.id} to={`/categories/${category.id}`} className={s.item}>
            <div className={s.image} style={{ backgroundImage: `url(${category.image})` }} />
            <h3>{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  )
}

