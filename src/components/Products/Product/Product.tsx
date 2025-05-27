import { Link } from "react-router-dom"
import { ROUTES } from "@/common/utils/Routes.ts"
import styles from "./Product.module.css"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { useEffect, useState } from "react"
import { addItemToCart } from "@/features/user/userSlice.ts"
import type { Product as ProductType } from "@/features/products/api/productsApi.types.ts"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { selectFavorites, toggleFavorite } from "@/features/products/model/productsSlice.ts"

type ProductProps = {
  data: ProductType
  images?: string[]
  title: string
  price: number
  description: string
}

const SIZES = [4.5, 5, 5.5]

export const Product: React.FC<ProductProps> = ({ images, title, price, description, data }) => {
  const dispatch = useAppDispatch()
  const [currentImage, setCurrentImage] = useState<string | undefined>(undefined)
  const [currentSize, setCurrentSize] = useState<number | undefined>(undefined)
  const [isSizeSelected, setIsSizeSelected] = useState(false)
  const favorites = useAppSelector(selectFavorites)
  const [isFavorite, setIsFavorite] = useState(false)

  const addToCart = () => {
    if (!currentSize) return
    dispatch(addItemToCart({
      product: data,
      size: currentSize
    }))
  }

  const handleSizeSelect = (size: number) => {
    setCurrentSize(size)
    setIsSizeSelected(true)
  }
  useEffect(() => {
    setIsFavorite(favorites.some(item => item.id === data.id))
  }, [favorites, data.id])

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(data))
  }

  useEffect(() => {
    if (!images?.length) return
    setCurrentImage(images[0])
  }, [images])

  return (
    <section className={styles.product}>
      <div className={styles.gallery}>
        <div className={styles.mainImage} style={{ backgroundImage: `url(${currentImage})` }} />
        <div className={styles.thumbnails}>
          {images?.map((image, i) => (
            <div
              key={i}
              className={`${styles.thumbnail} ${currentImage === image ? styles.active : ''}`}
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => setCurrentImage(image)}
            />
          ))}
        </div>
      </div>

      <div className={styles.details}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.priceContainer}>
          <span className={styles.price}>${price.toFixed(2)}</span>
          {price > 100 && <span className={styles.discount}>${(price * 0.8).toFixed(2)}</span>}
        </div>

        <div className={styles.variant}>
          <span className={styles.variantLabel}>Color:</span>
          <span className={styles.variantValue}>Green</span>
        </div>

        <div className={styles.variant}>
          <span className={styles.variantLabel}>Size:</span>
          <div className={styles.sizeOptions}>
            {SIZES.map((size) => (
              <button
                key={size}
                className={`${styles.size} ${currentSize === size ? styles.activeSize : ''}`}
                onClick={() => handleSizeSelect(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.description}>
          <h3 className={styles.descriptionTitle}>Description</h3>
          <p>{description}</p>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.addToCart}
            onClick={addToCart}
            disabled={!isSizeSelected}
          >
            {isSizeSelected ? 'Add to Cart' : 'Select Size First'}
          </button>
          <button
            className={styles.addToFavorites}
            disabled={!isSizeSelected}
            onClick={handleToggleFavorite}
          >
            {isFavorite ? 'In Favorites' : 'Add to Favorites'}
          </button>
        </div>

        <div className={styles.footer}>
          <span className={styles.stockInfo}>19 people purchased</span>
          <Link to={ROUTES.HOME} className={styles.returnLink}>
            ← Return to Store
          </Link>
        </div>
      </div>
    </section>
  )
}