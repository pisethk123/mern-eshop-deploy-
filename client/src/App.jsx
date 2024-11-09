import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import { useUserStore } from "./store/useUserStore"
import { useEffect } from "react"
import LoadingSpinner from "./components/LoadingSpinner"
import AdminPage from "./pages/AdminPage"
import CategoryPage from "./pages/CategoryPage"
import CartPage from "./pages/CartPage"
import { useCartStore } from "./store/useCartStore"
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage"
import PurchaseCancelPage from "./components/PurchaseCancelPage"

function App() {
  const {user, checkAuth, checkingAuth} = useUserStore()
  const {getCartItems} = useCartStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    getCartItems()
}, [checkAuth])

  if(checkingAuth) return <LoadingSpinner/>

  return <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signup" element={!user? <SignUpPage/> : <Navigate to={"/"}/>}/>
        <Route path="/login" element={!user? <LoginPage/> : <Navigate to={"/"}/>}/>
        <Route path="/secret-dashboard" element={user?.role === "admin" ? <AdminPage/> : <Navigate to={"/login"}/>}/>
        <Route path="/category/:category" element={<CategoryPage/>}/>
        <Route path="/cart" element={user? <CartPage/> : <Navigate to={"/login"}/>}/>
        <Route path="/purchase-success" element={user? <PurchaseSuccessPage/> : <Navigate to={"/login"}/>}/>
        <Route path="/purchase-cancel" element={user? <PurchaseCancelPage/> : <Navigate to={"/login"}/>}/>
      </Routes>
      <Toaster/>
    </BrowserRouter>
  </div>

}

export default App
