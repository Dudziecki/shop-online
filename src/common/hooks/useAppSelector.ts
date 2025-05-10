import { useSelector } from "react-redux"
import type { RootState } from "@/features/store.ts"

export const useAppSelector = useSelector.withTypes<RootState>()