import { Route, Routes } from "react-router-dom"
import { ROUTES } from "../../utils/Routes.ts"
import { Home } from "../Home/Home.tsx"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index path={ROUTES.HOME} element={<Home/>}/>
    </Routes>
  )
}
