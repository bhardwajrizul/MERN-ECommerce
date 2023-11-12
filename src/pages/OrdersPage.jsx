import Panel from "../components/Panel";
import StyleSpan from "../components/StyleSpan";
import NoItems from "../components/Orders/components/NoItems";
import { AiFillExclamationCircle, AiFillCheckCircle } from "react-icons/ai"


import { useSelector } from "react-redux"
import { useGetOrdersQuery } from "../store";
import { useNavigate } from "react-router-dom";


export default function OrdersPage() {

    const navigate = useNavigate()

    const { userId, token } = useSelector((state) => {
        return {
            userId: state.user.userId,
            token: state.user.token
        }
    })

    const { data, isLoading, isFetching, error } = useGetOrdersQuery({
        uid: userId,
        token: token
    },
        {
            skip: !userId || !token
        }
    )

    let content;

    if (data && !isFetching && !error && userId && token) {
        let ordersData = [...data.data.orders];
        ordersData.reverse();
        content = ordersData.map(({ address, amount, status, items, _id, transaction_id }) => {
            return (

                <div key={`${_id}`} className="my-4">
                    <div>
                        <Panel className='bg-white shadow-sm border flex flex-col py-1 rounded-full mb-2'>
                            <h1 className="text-2xl font-h-b my-1 ml-2 text-center">
                                Order ID : {transaction_id}
                            </h1>
                        </Panel>
                    </div>
                    <div className="bg-base-200 rounded-lg px-10 py-3">
                        {
                            items.map(({ product, quantity, size }) => {
                                return (
                                    <div
                                        key={`${transaction_id}_${product?._id}_order`}
                                        onClick={() => navigate(`/products/${product?._id}`)}
                                        className="flex p-1 rounded-lg flex-row items-center justify-around hover:bg-base-100 hover:cursor-pointer transition">
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
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="flex flex-row p-2 bg-base-200 w-full rounded-lg items-center justify-center">
                        <div>
                            <h1 className="font-h-b text-2xl p-2 rounded-lg bg-base-100 inline">
                                Shipping Address
                            </h1>
                            <p className="font-t text-md w-[80%] text-gray-700 p-2 bg-base-100 rounded-lg">
                                {address}
                            </p>
                        </div>
                        <div className="flex flex-col ">
                            <h1 className="font-h-b text-2xl m-2 bg-base-100 p-2 rounded-lg">
                                Total Amount :
                                <span className="font-t text-xl mx-1 text-gray-700 p-2">Rs {amount}</span>
                            </h1>
                            <div className="bg-base-100 p-2 m-2 rounded-lg flex flex-row items-center justify-center">
                                <span className="font-h-b text-2xl">
                                    Payment Status : </span>
                                {status === "Paid" ? <AiFillCheckCircle className="fill-green-700 text-4xl mx-1" /> : <AiFillExclamationCircle className="fill-red-700 text-4xl mx-1" />}
                            </div>
                        </div>
                    </div>
                </div>

            )
        })
    }

    return (
        <Panel className='py-8'>
            <div className="flex flex-row items-center justify-center">
                <h1 className="text-center w-fit font-h-b text-4xl me-2">
                    Your
                </h1>
                <StyleSpan>Orders</StyleSpan>
            </div>
            <div className='bg-base-100 min-h-[50vh] mt-6 lg:mx-14 rounded-lg flex flex-col items-center py-4 pb-14 mb-14'>
                {
                    isFetching && <span className="loading loading-dots loading-lg text-error"></span>
                }
                {
                    !isFetching && userId && token && (
                        content?.length > 0
                            ? content
                            : <NoItems />
                    )
                }
                {
                    !userId &&
                    !token &&
                    <div className="alert alert-error p-10 mb-10 w-96 flex flex-col">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-20 w-20" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span className="font-t-b text-2xl text-gray-800">You are not logged in!</span>
                        <span className="font-t text-xl text-white">Login to see your Orders!</span>

                    </div>
                }
            </div>


        </Panel>
    )
}