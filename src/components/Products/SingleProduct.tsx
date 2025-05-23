import { useNavigate, useParams } from "react-router-dom"
import { useGetProductQuery } from "@/features/products/product/productApi.ts"
import { useEffect } from "react"
import { ROUTES } from "@/common/utils/Routes.ts"
import { Product } from "@/components/Products/Product/Product.tsx"
import { Products } from "@/components/Products/Products.tsx"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { getRelatedProducts, selectRelatedProducts } from "@/features/products/model/productsSlice.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import styles from "./SingleProduct.module.css"

export const SingleProduct = () => {
  const { id } = useParams()
  const dispatch=useAppDispatch()
  const navigate = useNavigate()
  const {data,isFetching,isLoading,isSuccess}=useGetProductQuery({id})
  const relatedProducts =useAppSelector(selectRelatedProducts)
  // console.log(data)
  useEffect(() => {
    if(!isFetching && !isLoading && !isSuccess){
      navigate(ROUTES.HOME)
    }
  }, [isFetching,isLoading,isSuccess])
  useEffect(() => {
    if(!data||relatedProducts.length)return

      dispatch(getRelatedProducts(data.category.id))

  }, [data,dispatch,relatedProducts.length])
  if (isLoading || !data) {
    return (
      <div className={styles.skeletonContainer}>
        <div className={styles.skeletonProduct}>
          <div className={styles.skeletonGallery}></div>
          <div className={styles.skeletonDetails}>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonPrice}></div>
            <div className={styles.skeletonVariant}></div>
            <div className={styles.skeletonVariant}></div>
            <div className={styles.skeletonDescription}></div>
            <div className={styles.skeletonActions}></div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.container} >
      <Product data={data} images={data?.images} title={data.title} price={data.price} description={data.description} />
      <Products products={relatedProducts} amount={5} title="Related Products" />
    </div>
  )
}
