import { useParams } from "react-router-dom"
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react"
import { useGetProductsQuery } from "@/features/products/product/productApi.ts"
import { Products } from "@/components/Products/Products.tsx"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { selectCategory } from "@/features/categories/model/categoriesSlice.ts"
import styles from './Category.module.css'
import { ProductSkeleton } from "@/common/utils/ProductSkeleton/ProductSkeleton.tsx"
import type { Product } from "@/components/Products/types.ts"

export const Category = () => {
  const { id } = useParams<{ id: string }>()
  const categories = useAppSelector(selectCategory)
  const defaultValues = {
    title: "",
    price_min: "",
    price_max: ""
  }

  const defaultParams = {
    categoryId: id || "",
    title: "",
    price_min: 0,
    price_max: 0,
    limit: 5,
    offset: 0
  }

  const [values, setValues] = useState(defaultValues)
  const [items, setItems] = useState<Product[]>([])
  const [params, setParams] = useState(defaultParams)
  const [cat, setCat] = useState<string | undefined>("")

  const { data, isLoading, isSuccess } = useGetProductsQuery(params)

  useEffect(() => {
    if (!id) return
    setParams({ ...defaultParams, categoryId: id })
  }, [id])

  useEffect(() => {
    if (isLoading || !data) return

    // Type guard to ensure data is Product[]
    const isProductArray = (arr: unknown): arr is Product[] => {
      return Array.isArray(arr) && arr.every(item =>
        typeof item === 'object' &&
        item !== null &&
        'id' in item &&
        'title' in item
      )
    }

    const products = isProductArray(data) ? data : []
    setItems(products)
  }, [data, isLoading])

  useEffect(() => {
    if (!categories.length || !id) return;
    const numericId = parseInt(id, 10);
    const category = categories.find(item => item.id === numericId);
    setCat(category?.name);
  }, [categories, id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setParams({
      ...params,
      title: values.title,
      price_min: Number(values.price_min),
      price_max: Number(values.price_max)
    })
  }

  const handleReset = () => {
    setValues(defaultValues)
    setParams(defaultParams)
    setItems([])
  }

  const loadMore = () => {
    setParams(prev => ({
      ...prev,
      offset: prev.offset + prev.limit
    }))
  }

  return (
    <section className={styles.category}>
      <h2 className={styles.title}>{cat}</h2>

      <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.filterGroup}>
          <div className={styles.filter}>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="Product name"
              value={values.title}
              className={styles.input}
            />
          </div>

          <div className={styles.filter}>
            <input
              type="number"
              name="price_min"
              onChange={handleChange}
              placeholder="Min price"
              value={values.price_min}
              className={styles.input}
              min="0"
            />
          </div>

          <div className={styles.filter}>
            <input
              type="number"
              name="price_max"
              onChange={handleChange}
              placeholder="Max price"
              value={values.price_max}
              className={styles.input}
              min="0"
            />
          </div>
        </div>

        <div className={styles.buttons}>
          <button type="submit" className={styles.button}>
            Apply filters
          </button>
          <button
            type="button"
            className={`${styles.button} ${styles.resetButton}`}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>

      {isLoading && !items.length ? (
        <div className={styles.skeletonGrid}>
          {Array(4).fill(0).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      ) : !isSuccess || !items.length ? (
        <div className={styles.noResults}>
          <span>No products found</span>
          <button
            className={`${styles.button} ${styles.resetButton}`}
            onClick={handleReset}
          >
            Reset filters
          </button>
        </div>
      ) : (
        <>
          <Products products={items} title={""} styles={{ padding: 0 }} amount={items.length} loadMore={loadMore} />

        </>
      )}
    </section>
  )
}