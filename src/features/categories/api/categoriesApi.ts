import { instance } from "@/common/instance/instance.ts"
import type { Categories } from "@/features/categories/api/categoriesApi.types.ts"

export const categoriesApi={
  getCategories (){
    return instance.get<Categories[]>("/categories")
}
}