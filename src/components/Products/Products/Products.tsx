import { Link } from "react-router-dom"
import type { Product } from "@/components/Products/types.ts"
import React from "react"
import s from "./Products.module.css"

export interface ProductsProps {
  title?: string;
  products: Product[];
  styles?: React.CSSProperties;
  loadMore?:()=>void
  amount?: number; // amount теперь может быть undefined
}

export const Products: React.FunctionComponent<ProductsProps> = ({ products, title, styles, amount,loadMore }) => {

  const limit = amount ?? products.length
  const list = products.filter((_, i) => i < limit)


  // @ts-ignore
  return (
    <section className={s.products} style={styles}>
      {title && <h2 className={s.title}>{title}</h2>}
      <div className={s.list}>
        { list?.map((product: Product) => (
          <Link key={product.id} to={`/products/${product.id}`} className={s.product}>

            <div className={s.image} style={{ backgroundImage: `url(${product.images[0]})` }} />

            <div className={s.wrapper}>
              <h3 className={s.title}>{product.title}</h3>
              <div className={s.cat}>{product.category?.name}</div>
              <div className={s.info}>
                <div className={s.prices}>

                  <div className={s.price}>{product.price}$</div>
                  <div className={s.oldPrice}>{Math.floor(product.price * 0.8)}$</div>
                </div>
                <div className={s.purchases}>
                  {Math.floor(Math.random() * 20 + 1)} purchases
                </div>

              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className={s.containerBtn}>
        <button className={s.btn} onClick={loadMore}>See more</button>
      </div>

    </section>
  )
}