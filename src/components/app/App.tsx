import { AppRoutes } from "../routes/routes.tsx"
import './App.css'
import { Header } from "../Header/Header.tsx"
import { Sidebar } from "../Sidebar/Sidebar.tsx"
import { Footer } from "../Footer/Footer.tsx"

export const App = () => {
  return (
    <div className="App">

      <Header/>
      <div className="container">
        <Sidebar/>
        <AppRoutes/>
      </div>

      <Footer/>
    </div>
  )

}