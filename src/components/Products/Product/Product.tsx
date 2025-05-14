import { Link } from "react-router-dom"
import { ROUTES } from "@/common/utils/Routes.ts"
import styles from "./Product.module.css"

type ProductProps = {
  images?: string[]
  title: string
  price: number
  description: string
}
const SIZES = [4.5, 5, 5.5]
export const Product: React.FC<ProductProps> = ({ images, title, price, description }) => {
  const currentImage = images && images.length > 0 ? images[0] : ""
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
              onClick={() => {}}
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
                onClick={() => {}}
                className={`${styles.size}`}
                key={size}
              >
                {size}
              </div>
            ))}
          </div>
          <p className={styles.description}>{description}</p>
          <div className={styles.actions}>
            <button className={styles.cart}>Add to cart</button>
            <button className={styles.favorites}>Add to favorites</button>
          </div>
          <div className={styles.bottom}>
            <div className={styles.purchase}>19 purchased</div>
            <Link to={ROUTES.HOME} />
          </div>
        </div>
      </div>
    </section>
  )
}