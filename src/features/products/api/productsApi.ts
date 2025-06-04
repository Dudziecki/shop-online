import { instance } from "@/common/instance/instance.ts"
import type { Product } from "@/components/Products/types.ts"


export const productsApi={
  getProducts (){
    return instance.get<Product[]>("/products")
}
}