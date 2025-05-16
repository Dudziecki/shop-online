import { Link } from "react-router-dom"
import { ROUTES } from "@/common/utils/Routes.ts"
import styles from "./Product.module.css"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { useEffect, useState } from "react"
import { addItemToCart } from "@/features/user/userSlice.ts"
import type { Product as ProductType } from "@/features/products/api/productsApi.types.ts"

type ProductProps = {
  data:ProductType

  images?: string[]
  title: string
  price: number
  description: string
}
const SIZES = [4.5, 5, 5.5]
export const Product: React.FC<ProductProps> = ({ images, title, price, description ,data}) => {
  const dispatch = useAppDispatch()
  // const currentImage = images && images.length > 0 ? images[0] : ""
  const [currentImage, setCurrentImage] = useState<string | undefined>(undefined)
  const [currentSize, setCurrentSize] = useState<number | undefined>(undefined)
  const addToCart = () => {
    dispatch(addItemToCart({
      product: data,
    }))
  }
  useEffect(() => {
    if (!images?.length) return

    setCurrentImage(images[0])
  }, [images])
  return (
    <section className={styles.Product}>
      <div className={styles.images}>
        <div className={styles.current} style={{ backgroundImage: `url(${currentImage})` }} />
        <div>
          {images?.map((image, i) => (
            <div
              key={i}
              className={styles.image}
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => setCurrentImage(image)}
            />
          ))}
        </div>

      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.price}>{price}$</div>
        <div className={styles.color}>
          <span>Color:</span> Green
        </div>
        <div className={styles.sizes}>
          <span>Sizes:</span>
          <div className={styles.list}>
            {SIZES.map((size) => (
              <div
                onClick={() => setCurrentSize(size)}
                className={`${styles.size} ${
                  currentSize === size ? "active" : ""
                }`}
                key={size}
              >
                {size}
              </div>
            ))}
          </div>
          <p className={styles.description}>{description}</p>
          <div className={styles.actions}>
            <button className={styles.cart} onClick={addToCart}>Add to cart</button>
            <button className={styles.favorites}>Add to favorites</button>
          </div>
          <div className={styles.bottom}>
            <div className={styles.purchase}>19 purchased</div>
            <Link to={ROUTES.HOME}>Return to store</Link>
          </div>
        </div>
      </div>
    </section>
  )
}