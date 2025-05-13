import { useNavigate, useParams } from "react-router-dom"
import { useGetProductQuery } from "@/features/products/product/productApi.ts"
import { useEffect } from "react"
import { ROUTES } from "@/common/utils/Routes.ts"
import { Product } from "@/components/Products/Product/Product.tsx"


export const SingleProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const {data,isFetching,isLoading,isSuccess}=useGetProductQuery({id})
  // console.log(data)
  useEffect(() => {
    if(!isFetching && !isLoading && !isSuccess){
      navigate(ROUTES.HOME)
    }
  }, [isFetching,isLoading,isSuccess])
  return ! data?(<section>Loading</section>):(
    <div>
      <Product images={data?.images} title={data.title} price={data.price} description={data.description} />
    </div>
  )
}
