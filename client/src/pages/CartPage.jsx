import React, { useEffect } from "react";
import { useCartStore } from "../store/useCartStore";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCard from "../components/GiftCard";

const CartPage = () => {
    const {cart} = useCartStore()

  return <div className="flex">
    <div className="mx-auto mx-w-screen-xl px-4 xl:px-0">
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            {
                cart?.length === 0 ? <div>
                    <ShoppingCart className="h-4 w-24 text-gray-300"/>
                    <h3 className="text-2xl font-semibold">Your cart is empty</h3>
                    <p className="text-gray-400">Looks like you haven't added anything to your cart ?</p>
                    <Link to="/" className="mt-4 rounded-md bg-emerald-500 px-6 py-2 text-white hover:bg-emerald-600">Start Shopping now</Link>
                </div>
                : <div className="space-y-6">
                    {
                        cart?.map((item) => <CartItem key={item._id} item={item}/>)
                    }
                </div>
            }
            {
                cart.length > 0 &&(<div>
                    <OrderSummary/>
                    <GiftCard/>
                </div>)
            }
        </div>
        {
        cart?.length > 0 && <PeopleAlsoBought/>
        }
    </div>
  </div>;
};

export default CartPage;
