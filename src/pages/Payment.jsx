import { useEffect, useState } from "react"
import { AiFillExclamationCircle, AiFillCheckCircle } from "react-icons/ai"
import { useConfirmPaymentQuery } from "../store"
import { useSelector } from "react-redux"
import { useSearchParams, Link } from "react-router-dom"

export default function Payment() {
    const [confirm, setConfirm] = useState(false)
    const [paymentMsg, setPaymentMsg] = useState(null)


    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('order_id');


    const { user_id, token } = useSelector((state) => {
        return {
            user_id: state.user.userId,
            token: state.user.token
        }
    })


    const { data, isLoading, isFetching, error } = useConfirmPaymentQuery(
        {
            uid: user_id,
            userToken: token,
            oid: orderId
        },
        {
            skip: !user_id || !token || !orderId
        }
    )

    if (!orderId) {
        setPaymentMsg('Invalid Verification Data')
        setConfirm(false)
    }

    useEffect(() => {
        if (!token || !user_id) {
            setConfirm(false)
            setPaymentMsg('Invalid Verification Data')
        }
        if (data?.status == 'success' && data?.data) {
            if (data?.data.orderStatus != 'Paid') {
                setConfirm(false)
            } else {
                setConfirm(true)
            }
            setPaymentMsg(`Order Id : ${data?.data.orderId}`)
        }
    }, [data, isLoading, isFetching, error, user_id, token])

    return (
        <div className=
            {`artboard artboard-horizontal flex flex-col justify-center items-center phone-2 p-4 ${!confirm ? 'bg-red-200' : 'bg-green-200'} mx-auto my-10 rounded-lg`}>
            {
                isFetching
                    ? <span className="loading loading-bars loading-lg text-error"></span>
                    : confirm
                        ? <AiFillCheckCircle className="text-9xl fill-green-700 mb-4" />
                        : <AiFillExclamationCircle className="text-9xl fill-red-700 mb-4" />

            }
            <h1 className={`text-4xl mb-4 ${!confirm ? 'text-red-800' : 'text-green-800'}`}>
                {
                    !user_id || !token || isFetching
                        ? `Loading Payment Status`
                        : confirm
                            ? `Payment Successful`
                            : `Payment Failed`
                }
            </h1>
            <h1 className="mb-4">
                {paymentMsg}
            </h1>
            {
                user_id && token &&
                <Link to={`/user/${user_id}/orders`}>
                    <button className={`btn ${confirm ? 'btn-success' : 'btn-error'} rounded`}>Go to your orders</button>
                </Link>
            }
        </div>
    )
}