import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import {
  addItemToCart,
  selectCart,
  updateCartItemQuantity,
  removeFromCart,
  selectError
} from "@/features/user/userSlice.ts"
import { sumBy } from "@/common/utils/sunBy.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import type { CartItem } from "@/features/user/userSlice.ts"
import styles from "./Cart.module.css"
import { useEffect, useState } from "react"

export const Cart = () => {
  const dispatch = useAppDispatch()
  const cart = useAppSelector(selectCart)


const isLoading=useAppSelector(selectError)

  const handleDecrease = (item: CartItem) => {
    const newQuantity = item.quantity - 1;
    if (newQuantity < 1) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(updateCartItemQuantity({ id: item.id, quantity: newQuantity }));
    }
  }

  const handleIncrease = (item: CartItem) => {
    dispatch(updateCartItemQuantity({ id: item.id, quantity: item.quantity + 1 }));
  }

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  }

  if (isLoading) {
    return (
      <section className={styles.cart}>
        <h2 className={styles.title}>Your Cart</h2>
        <div className={styles.skeletonList}>
          {[1, 2].map((item) => (
            <div key={item} className={styles.skeletonItem}>
              <div className={styles.skeletonImage}></div>
              <div className={styles.skeletonInfo}>
                <div className={styles.skeletonTitle}></div>
                <div className={styles.skeletonCategory}></div>
              </div>
              <div className={styles.skeletonPrice}></div>
              <div className={styles.skeletonQuantity}></div>
              <div className={styles.skeletonTotal}></div>
              <div className={styles.skeletonClose}></div>
            </div>
          ))}
          <div className={styles.skeletonActions}>
            <div className={styles.skeletonTotalPrice}></div>
            <div className={styles.skeletonButton}></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>Your Cart</h2>
      {!cart.length ? (
        <div className={styles.empty}>Here is Empty</div>
      ) : (
        <>
          <div className={styles.list}>
            {cart.map(item => {
              const { product, quantity, id } = item
              return (
                <div className={styles.item} key={id}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${product.images[0]})` }}
                  />
                  <div className={styles.info}>
                    <h3 className={styles.productTitle}>{product.title}</h3>
                    <div className={styles.category}>{product.category.name}</div>
                  </div>
                  <div className={styles.price}>{product.price}$</div>
                  <div className={styles.quantity}>
                    <button
                      className={styles.quantityButton}
                      onClick={() => handleDecrease(item)}
                      aria-label="Decrease quantity"
                    >
                      <span className={styles.minus}></span>
                    </button>
                    <span className={styles.quantityValue}>{quantity}</span>
                    <button
                      className={styles.quantityButton}
                      onClick={() => handleIncrease(item)}
                      aria-label="Increase quantity"
                    >
                      <span className={styles.plus}></span>
                    </button>
                  </div>
                  <div className={styles.total}>{product.price * quantity}$</div>
                  <button
                    className={styles.close}
                    onClick={() => handleRemove(id)}
                    aria-label="Remove item"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L15 15M15 1L1 15" stroke="#576067" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              )
            })}
          </div>
          <div className={styles.actions}>
            <div className={styles.totalPrice}>
              Total Price:{" "}
              <span className={styles.totalAmount}>
                {sumBy(cart.map(({quantity, product}) => quantity * product.price))}$
              </span>
            </div>
            <button className={styles.proceedButton}>Proceed to checkout</button>
          </div>
        </>
      )}
    </section>
  )
}