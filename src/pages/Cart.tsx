import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../components/CartItem";
import { addToCart as addToCartAction, calculatePrice, discountApplied, removeCartitem } from "../redux/reducer/cartReducer";
import { CartReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";
import axios from "axios";
import { server } from "../redux/store";

function Cart() {

    const { cartItems, subTotal, tax, total, shippingCharges, discount } = useSelector((state:{
        cartReducer: CartReducerInitialState
    }) => state.cartReducer)

    const dispatch = useDispatch();
    const [couponCode, setCouponCode] = useState<string>()
    const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false)
    const incrementHandler = (cartItem:CartItem) => {
        if(cartItem.quantity >= cartItem.stock) return ;
        dispatch(addToCartAction({...cartItem, quantity: cartItem.quantity + 1}))
    }
    const decrementHandler = (cartItem:CartItem) => {
        if(cartItem.quantity <= 1) return ;

        dispatch(addToCartAction({...cartItem, quantity: cartItem.quantity - 1}))
    }
    const removeHandler = (productId: string) => {
        dispatch(removeCartitem(productId));
    } 
    useEffect(()=>{

        const { token, cancel } = axios.CancelToken.source();
        const timeOutID = setTimeout(()=>{
            axios.get(`${server}/api/vi/payment/discount?coupon=${couponCode}`, {cancelToken: token})
            .then((res) => {
                dispatch(discountApplied(res.data.discount));
                setIsValidCouponCode(true);
                dispatch(calculatePrice());
            })
            .catch(()=>{
                dispatch(discountApplied(0));
                setIsValidCouponCode(false);
                dispatch(calculatePrice());
            })
        },1000)

        return()=>{
            clearTimeout(timeOutID)
            cancel();
            setIsValidCouponCode(false)
        }
    },[couponCode])

    useEffect(()=>{
        dispatch(calculatePrice())
    },[cartItems])
    return (
        <div className="cart">
        <main>
            {
                cartItems.length > 0 ? (
                     cartItems.map((i, index)=>(
                    <CartItemCard key={index} cartItem={i} incrementHandler={incrementHandler} decrementHandler={decrementHandler} removeHandler={removeHandler}/>
                ))):(<h1>Your cart is empty</h1>)
            }
        </main>
        <aside>
            <p>Subtotal: &#8377;{subTotal}</p>
            <p>ShippingCharges: &#8377;{shippingCharges}</p>
            <p>Tax: &#8377;{tax}</p>
            <p>Discount : <em style={{color:'red'}}> - &#8377; {discount}</em></p>
            <p><b>Total : &#8377; {total}</b></p>
            <input type="text" value={couponCode} onChange={(e)=> setCouponCode(e.target.value)} placeholder="coupon code"/>
            {
            couponCode && (
                isValidCouponCode? (<span style={{color:"green"}}>&#8377; {discount} off using the <code>{couponCode}</code>
            </span>):(<span style={{color:'red'}}>InValid Coupon <VscError /></span>)
            )
            }
            {
                cartItems.length > 0 && <Link to='/shipping'>Shipping</Link>
            }
        </aside>


        </div>
        
    )
}

export default Cart