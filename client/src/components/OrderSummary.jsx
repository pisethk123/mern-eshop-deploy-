import React from "react";
import { useCartStore } from "../store/useCartStore";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import {loadStripe} from "@stripe/stripe-js"
import axios from "../libs/axios";

const stripePromise = loadStripe("pk_test_51PlkeOEoPe7NvJTsqOShfYquAmBPL7IIqoue5FPN4aPVjWLFLifJ9vN0fDRg1xNOCFQgZOTotXXDk4ZDirVaeHv100JiPsHRY1")

const OrderSummary = () => {
    const {total, subtotal, coupon, isCouponApplied, cart} = useCartStore()
    const savings = subtotal - total

    const handleStripePayment = async () => {
        const stripe = await stripePromise
        const res = await axios.post("/payments/create-checkout-session", {
            products: cart, 
            couponCode: coupon ? coupon.code: null,
        })
        const session = res.data
        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        })
        console.log(session)

        if(result.error) console.log(result.error)
    }
  return <div >
    <p className="text-xl font-semibold text-emerald-400">Order summary</p>
    <div className="space-y-4">
        <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-300">Orignal price</dt>
                <dd className="text-base font medium text-white">$ {subtotal.toFixed(2)}</dd>
            </dl>

            {
                savings > 0 && <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-300">Savings</dt>
                    <dd className="text-base font-medium text-emerald-400">-$ {savings.toFixed(2)}</dd>
                </dl>
            }

            {
                coupon && isCouponApplied && <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-300">Coupon {coupon.code}</dt> 
                    <dt className="text-base font-medium text-gray-400">Coupon {coupon.discountPercentage}%</dt> 
                </dl>
            }
            <dl className='flex items-center justify-between gap-4 border-t border-gray-600 pt-2'>
                <dt className='text-base font-bold text-white'>Total</dt>
                <dd className='text-base font-bold text-emerald-400'>${total.toFixed(2)}</dd>
            </dl>
        </div>
        <button
            className='flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
            onClick={handleStripePayment}>Proceed to Checkout</button>

        <div className='flex items-center justify-center gap-2'>
            <span className='text-sm font-normal text-gray-400'>or</span>
            <Link
                to='/'
                className='inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline'>Continue Shopping
                <MoveRight size={16} />
            </Link>
        </div>
    </div>
  </div>;
}

export default OrderSummary;
