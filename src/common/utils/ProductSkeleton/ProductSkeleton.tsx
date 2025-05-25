import styles from "./ProductSkeleton.module.css"
export const ProductSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonTitle}></div>
      <div className={styles.skeletonPrice}></div>
    </div>
  )
}