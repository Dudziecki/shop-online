import { Link } from "react-router-dom"
import { ROUTES } from "@/common/utils/Routes.ts"
import styles from "./ShopNowProduct.module.css"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { useEffect, useState } from "react"
import { addItemToCart } from "@/features/user/userSlice.ts"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { selectFavorites, toggleFavorite } from "@/features/products/model/productsSlice.ts"
import BG from "@/assets/images/comp.png"

const productImages = [
  BG,
  "https://example.com/image2.jpg",
  "https://example.com/image3.jpg"
]

const LENNON_R2D2_PRODUCT = {
  id: 1,
  title: "LENNON r2d2 with NVIDIA 5090 TI",
  slug: "lennon-r2d2-nvidia-5090-ti",
  price: 1999.99,
  description: "The ultimate gaming PC with NVIDIA 5090 TI graphics card...",
  category: {
    id: 1,
    name: "Computers",
    image: "string",
    slug: "computers",
  },
  images: productImages
}


const SIZES = [4.5, 5, 5.5]

export const ShopNowProduct = () => {
  const dispatch = useAppDispatch()
  const [currentImage, setCurrentImage] = useState<string>(BG)
  const [currentSize, setCurrentSize] = useState<number | undefined>(undefined)
  const [isSizeSelected, setIsSizeSelected] = useState(false)
  const favorites = useAppSelector(selectFavorites)
  const [isFavorite, setIsFavorite] = useState(false)

  const addToCart = () => {
    if (!currentSize) return
    dispatch(addItemToCart({
      product: LENNON_R2D2_PRODUCT,

    }))
  }

  const handleSizeSelect = (size: number) => {
    setCurrentSize(size)
    setIsSizeSelected(true)
  }

  useEffect(() => {
    setIsFavorite(favorites.some(item => item.id === LENNON_R2D2_PRODUCT.id))
  }, [favorites])

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(LENNON_R2D2_PRODUCT))
  }

  return (
    <section className={styles.product}>
      <div className={styles.gallery}>
        <div className={styles.mainImage} style={{ backgroundImage: `url(${currentImage})` }} />
        <div className={styles.thumbnails}>
          {productImages.map((image, i) => (
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
        <h1 className={styles.title}>{LENNON_R2D2_PRODUCT.title}</h1>
        <div className={styles.priceContainer}>
          <span className={styles.price}>${LENNON_R2D2_PRODUCT.price.toFixed(2)}</span>
          <span className={styles.discount}>${(LENNON_R2D2_PRODUCT.price * 0.8).toFixed(2)}</span>
        </div>

        <div className={styles.variant}>
          <span className={styles.variantLabel}>Color:</span>
          <span className={styles.variantValue}>Space Gray</span>
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
          <p>{LENNON_R2D2_PRODUCT.description}</p>
          <ul className={styles.features}>
            <li>NVIDIA GeForce RTX 5090 TI 24GB GDDR6X</li>
            <li>Intel Core i9-13900K 5.8GHz</li>
            <li>64GB DDR5 RAM 6000MHz</li>
            <li>2TB NVMe SSD + 4TB HDD</li>
            <li>Liquid cooling system</li>
            <li>RGB customizable lighting</li>
          </ul>
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
            className={`${styles.addToFavorites} ${isFavorite ? styles.favorite : ''}`}
            onClick={handleToggleFavorite}
          >
            {isFavorite ? 'In Favorites' : 'Add to Favorites'}
          </button>
        </div>

        <div className={styles.footer}>
          <span className={styles.stockInfo}>42 people purchased</span>
          <Link to={ROUTES.HOME} className={styles.returnLink}>
            ← Return to Store
          </Link>
        </div>
      </div>
    </section>
  )
}