import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { selectCart } from "@/features/user/userSlice.ts"
import { sumBy } from "@/common/utils/sunBy.ts"

export const Cart = () => {
  const cart = useAppSelector(selectCart)
  return (
    <section className="cart">
      <h2 className={"title"}>Your Cart</h2>
      {!cart.length ? (
        <div className={"empty"}>Here is Empty</div>
      ) : (
        <>
        <div className={"list"}>
          {cart.map(item => {
            const { product, quantity, id } = item
            return (
              <div className={"item"} key={id}>
                <div className={"image"} style={{ backgroundImage: `url(${product.images[0]})` }} />
                <div className="info">
                  <h3 className="title">{product.title}</h3>
                  <div className="category">{product.category.name}</div>
                </div>
                <div className="price">{product.price}$</div>
                <div className="quantity">
                  <div className="minus">
                    <span></span>
                  </div>
                  <span>{quantity}</span>
                  <div className="plus">
                    <span></span>
                  </div>
                </div>
                <div className="total">{product.price*quantity}$</div>
                <div className="close">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_103_289)">
                      <path
                        d="M5.65572 6.383C5.75272 6.4805 5.88022 6.529 6.00772 6.529C6.13522 6.529 6.26272 6.4805 6.35972 6.383C6.55422 6.1885 6.55422 5.873 6.35972 5.6785L2.37722 1.692C2.18272 1.4975 1.86772 1.4975 1.67322 1.692C1.47872 1.8865 1.47872 2.202 1.67322 2.3965L5.65572 6.383Z"
                        fill="white" fill-opacity="0.5" />
                      <path
                        d="M8.70342 8.024L14.3259 2.3965C14.5204 2.202 14.5204 1.8865 14.3259 1.692C14.1314 1.4975 13.8164 1.4115 13.6219 1.6065L7.64792 7.5H7.49992V7.6725L1.59992 13.6515C1.40542 13.846 1.44242 14.1615 1.63642 14.356C1.73342 14.4535 1.87942 14.502 2.00692 14.502C2.13442 14.502 2.27092 14.4535 2.36792 14.356L7.99492 8.729L13.6194 14.3565C13.7164 14.454 13.8454 14.5025 13.9724 14.5025C14.0994 14.5025 14.2279 14.454 14.3249 14.3565C14.5194 14.162 14.5199 13.8465 14.3254 13.652L8.70342 8.024Z"
                        fill="white" fill-opacity="0.5" />
                    </g>
                    <defs>
                      <clipPath id="clip0_103_289">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>

              </div>
            )
          })}
        </div>
          <div className="actions">
            <div className="total">
              Total Price:{""}
              <span>
                {sumBy(cart.map(({quantity, product.price}) => (quantity*price))}$
              </span>
            </div>
            <button className={"Proceed"}>Proceed to checkout</button>
          </div>
        </>
      )}
    </section>
  )
}

