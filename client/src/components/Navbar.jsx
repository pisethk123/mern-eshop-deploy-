import React from "react";
import {ShoppingCart, UserPlus, LogIn, LogOut, Lock} from  "lucide-react"
import {Link} from "react-router-dom"
import { useUserStore } from "../store/useUserStore";
import { useCartStore } from "../store/useCartStore";

const Navbar = () => {
const {user, logout} = useUserStore()
    const isAdmin = user?.role === 'admin'
    const {cart} = useCartStore()

  return <header className="left-0 w-full border-b border-emerald-950 z-50">
    <div className="container mx-auto px-3 py-3 justify-between flex ">
        <Link to={"/"} className="text-2xl font-bold text-emerald-400 items-center">E-Shopping</Link>
        <nav className="flex flex-wrap items-center gap-2">
            {user && 
                <Link to={"/cart"} className="relative group pr-5">
                    <ShoppingCart className="inline-block mr-1 group-hover:text-emerald-400" size={20}/>
                    <span className="hidden sm:inline">Cart</span>
                    {cart.length > 0 && <span className="absolute top-2 bg-emerald-500 text-white text-xs rounded-full px-2 py-0.5 group-hover:bg-emerald-400">{cart.length}</span>}
                </Link>
            }
            {isAdmin &&
                <Link 
                    className="bg-emerald-800 hover:bg-emerald-600 text-white px-4 py-2 rounded-md font-medium flex items-center"
                    to={"/secret-dashboard"}>
                    <Lock className="inline-block mr-1" size={18}/>
                    <span className="hidden sm:inline">Dashboard</span>
                </Link>
            }
            {user ? 
                <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 flex items-center rounded-md"
                        onClick={logout}>
                    <LogOut size={18}/>
                    <span className="hidden sm:inline ml-2">Log Out</span>
                </button>: <>
                <Link to={"/signup"} className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-2 rounded-md flex items-center">
                    <UserPlus className="mr-2" size={18}/> Sign Up
                </Link>
                <Link to={"/login"} className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-2 rounded-md flex items-center">
                    <LogIn className="mr-2" size={18}/> Log In
                </Link>
            </>}
        </nav>
    </div>
  </header>
};

export default Navbar;
