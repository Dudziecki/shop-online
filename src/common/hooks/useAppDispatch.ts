import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/features/store.ts"


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
