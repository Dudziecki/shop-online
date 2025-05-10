import { instance } from "@/common/instance/instance.ts"
import type { Product } from "@/features/products/api/productsApi.types.ts"

export const productsApi={
  getProducts (){
    return instance.get<Product[]>("/products")
}
}