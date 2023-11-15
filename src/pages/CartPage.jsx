import Button from "../components/Button";
import Panel from "../components/Panel";
import { AiFillDelete } from 'react-icons/ai'
import { BsFillCartFill } from 'react-icons/bs'
import StyleSpan from "../components/StyleSpan";
import NoItems from "../components/Cart/components/NoItems";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartError from "../components/Cart/components/CartError";
import Skeleton from "../components/Skeleton";
import { useState } from "react";
import { useGetCartItemsQuery, usePlaceOrderMutation, useRemoveItemFromCartMutation } from "../store";
import loadRazorpayScript from "../utils/loadRazorpayScript";
import { getCartItems } from "../store/APIs/usersApi";



export default function CartPage() {
    const [err, setErr] = useState(null)
    // console.log(getCartItems)

    const [deleting, setDeleting] = useState({
        pid: null,
        size: null
    })
    const [checkout, setCheckout] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const { userId, token } = useSelector((state) => {
        return {
            userId: state.user.userId,
            token: state.user.token
        }
    })

    const { data, isLoading, isFetching, error, refetch } = useGetCartItemsQuery(
        { uid: userId, token: token },
        {
            skip: !userId || !token
        }
    )
    const [deleteItem] = useRemoveItemFromCartMutation()
    const [placeOrder] = usePlaceOrderMutation()

    const handleDeleteCartItems = async (pid, size) => {
        setDeleting({ pid: pid, size: size })
        let result = await deleteItem({
            uid: userId,
            token,
            pid: pid || 0,
            size: size
        })
        if (result) {
            setDeleting({
                pid: null,
                size: null
            })
        }
    }

    const handleCheckout = async () => {
        setCheckout(true);
        setErr(null)

        // Load Razorpay script
        const res = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        const result = await placeOrder({
            uid: userId,
            userToken: token,
        });

        // `result.data` is the object containing the order details from Razorpay
        if (result.data && result.data.status === 'success' && !err) {
            refetch()
            var options = {
                "key": result.data.razorpayKey, // Key ID generated from the Dashboard
                "amount": result.data.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, the amount should be in paise
                "currency": result.data.currency,
                "name": "MERN Ecommerce",
                "description": "Order Transaction",
                "image": "https://vitejs.dev/logo-with-shadow.png",
                "order_id": result.data.id, // the `id` obtained in the response of createRazorpayOrder.
                "callback_url": "https://mern-ecommerce-api-nzid.onrender.com/api/order/confirmOrder",  // PROD
                // "callback_url": "http://localhost:8080/api/order/confirmOrder", // DEV
                "prefill": {
                    "name": result.data.name,
                    "email": result.data.mail,
                    "contact": result.data.phone,
                },
                "theme": {
                    "color": "#f4599c"
                }
            };

            var paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } else {
            if (result?.error.data && result?.error.data.status == 'error' && result?.error.data.userError) {
                setErr(result.error.data.message)
            }
            console.error('Failed to place order:', result);
        }
        setCheckout(false);
    };

    let content;
    let cart;
    // console.log(err)

    if (data && !isFetching && !error && userId && token) {
        let cartData = data.data.cart
        content = cartData.map(({ product, quantity, size }) => {
            let newPrice =
                Math.ceil(product?.price - (product?.price * (product?.discountPercent / 100)));
            return (
                <div key={`${product?._id}_${size}_cart`} className="w-[90%] flex flex-row flex-wrap bg-base-200 rounded-lg  my-2 p-4 items-center justify-around">
                    <div
                        onClick={() => navigate(`/products/${product?._id}`)}
                        className="flex p-1 rounded-lg flex-row flex-wrap items-center justify-around hover:bg-base-100 hover:cursor-pointer transition">
                        <div className="h-24 overflow-hidden rounded-lg">
                            <img className="h-full object-cover" src={product?.image || 'https://via.placeholder.com/150'} />
                        </div>
                        <div className="mx-2 flex flex-col items-center justify-center">
                            <h1 className="text-2xl font-h-b my-1 ml-2 text-center underline">
                                {product?.name || "Not Availavle"}
                            </h1>
                            <p className="font-t">{product?._id || "Not Availavle"}</p>
                        </div>
                        <div className="mx-2 flex flex-col items-center justify-center">
                            <h1 className="text-2xl font-h-b my-1 ml-2 text-center">
                                Quantity
                            </h1>
                            <p className="bg-base-300 w-7 h-7 text-center rounded-full">{quantity}</p>
                        </div>
                        {
                            size &&
                            <div className="mx-2 flex flex-col items-center justify-center">
                                <h1 className="text-2xl font-h-b my-1 ml-2 text-center">
                                    Size
                                </h1>
                                <p className="bg-base-300 w-7 h-7 text-center rounded-full">{size}</p>
                            </div>
                        }
                        <div className="mx-2 flex flex-col items-center justify-center">
                            <h1 className="text-2xl font-h-b my-1 ml-2 text-center">
                                Price
                            </h1>
                            <p> Rs:
                                {
                                    ` ${newPrice}`
                                }
                            </p>
                        </div>
                        <div className="mx-2 flex flex-col items-center justify-center">
                            <h1 className="text-2xl font-h-b my-1 ml-2 text-center underline">
                                Total
                            </h1>
                            <p className="bg-base-300 text-center p-1 rounded-lg font-t-b">Rs: {` ${newPrice * quantity}`}</p>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-center">
                        <div className="my-2 mx-2">
                            {
                                deleting.pid === product?._id && deleting.size === size
                                    ? <span className="loading loading-spinner text-error"></span>
                                    :
                                    <Button dark onClick={() => handleDeleteCartItems(product?._id, size)}>
                                        <AiFillDelete className="text-2xl" />
                                    </Button>
                            }
                        </div>
                    </div>
                </div>
            )
        })
    } else if (error) {
        content = <CartError />
    }

    if (content?.length > 0 && !isFetching && !isLoading && userId && token) {
        cart = (
            <>
                {content}
                {
                    err &&
                    <p className="text-red-500 mt-6 px-4 py-2 rounded-lg bg-red-100">{err}</p>
                }
                {
                    checkout
                        ? <span className="mt-4 loading loading-spinner text-error loading-lg"></span>
                        : <Button onClick={() => handleCheckout()} dark className='mt-4'>Procced to Checkout</Button>
                }
            </>
        )
    }


    return (
        <Panel className='py-8'>
            <div className="flex flex-row items-center justify-center">
                <h1 className="text-center w-fit font-h-b text-4xl me-2">
                    Manage Your
                </h1>
                <StyleSpan>Cart</StyleSpan>
            </div>
            <div className='bg-base-100 min-h-[50vh] mt-6 lg:mx-14 rounded-lg flex flex-col items-center py-4 pb-14 mb-14'>
                {
                    isFetching && <span className="loading loading-dots loading-lg text-error"></span>
                }
                {
                    !isFetching && userId && token && (
                        content.length > 0 && cart
                            ? cart
                            : <NoItems />
                    )
                }
                {
                    !userId &&
                    !token &&
                    <div className="alert alert-error p-10 mb-10 w-96 flex flex-col">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-20 w-20" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span className="font-t-b text-2xl text-gray-800">You are not logged in!</span>
                        <span className="font-t text-xl text-white">Login to see your cart!</span>

                    </div>
                }

            </div>
        </Panel>
    )
}