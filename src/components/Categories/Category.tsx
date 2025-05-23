import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useGetProductsQuery } from "@/features/products/product/productApi.ts"
import { Products } from "@/components/Products/Products.tsx"


export const Category = () => {
  const { id } = useParams()
  const defaultParams = {
    title: "",
    price_min: 0,
    price_max: 0,
    categoryId: id
  }
  const [params, setParams] = useState(defaultParams)

  useEffect(() => {
    if (!id) return
    setParams({ ...defaultParams, categoryId: id })
  }, [id])
  const { data ,isLoading,isSuccess} = useGetProductsQuery(params)
  return (
    <section>
      <h2 className={"s.title"}>Shoes</h2>
      <form className={"filters"} onSubmit={() => {
      }}>
        <div className="filter">
          <input type="text"
                 name="title"
                 onChange={() => {
                 }}
                 placeholder="Product name"
                 value={params.title}
          />
        </div>
        <div className="filter">
          <input type="number"
                 name="price_min"
                 onChange={() => {
                 }}
                 placeholder="0"
                 value={params.price_min}
          />
        </div>
        <div className="filter">
          <input type="number"
                 name="price_max"
                 onChange={() => {
                 }}
                 placeholder="0"
                 value={params.price_max}
          />
        </div>
        <button type="submit" hidden></button>
      </form>
      {isLoading?(
        <div className="preloader">Loading...</div>
      ):!isSuccess|| !data.length ? (
        <div className={"back"}>
          <span>No results</span>
          <button>Reset</button>
        </div>
      ):(
        <Products products={data} title={""} styles={{padding:0}} amount={data.length}/>
      )}
    </section>
  )
}

