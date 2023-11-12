import { useDispatch, useSelector } from "react-redux";
import ProductCarousel from "../components/Products/components/ProductCarousel";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetProductInfo, useAddToCartMutation, useAddToWishListMutation, useFetchProductInfoQuery } from "../store";
import Skeleton from "../components/Skeleton";
import Button from "../components/Button";

import { AiFillHeart } from 'react-icons/ai'
import { BsFillCartFill } from 'react-icons/bs'
import { CiStar } from 'react-icons/ci'
import Panel from "../components/Panel";
import { useEffect, useState } from "react";
import ProductSkeleton from "../components/Products/components/ProductSkeleton";
import mapSize from '../utils/mapSize'
import ProductSizeSelector from "../components/Products/components/ProductSizeSelector";
import ProductQuantitySelector from "../components/Products/components/ProductQuantitySelector";
import ProductInfoError from "../components/Products/components/ProductInfoError";
import ProductName from "../components/Products/components/ProductName";
import ProductRating from "../components/Products/components/ProductRating";
import ProductDescription from "../components/Products/components/ProductDescription";
import { ProductDetail } from "../components/Products/components/ProductDetail";

const images = Array(10).fill().map((_, i) => `https://picsum.photos/id/${i + 1}/800/800`)



const ProductInfoPage = () => {
    const [sizeErr, setSizeErr] = useState()
    const [wishlistLoading, setWishlistLoading] = useState(false)
    const [cartLoading, setCartLoading] = useState(false)

    const dispatch = useDispatch()
    const pid = useParams().pid;
    const {
        data,
        error,
        isLoading,
        isFetching
    } = useFetchProductInfoQuery(pid)


    const [addToWishList] = useAddToWishListMutation()
    const [addToCart] = useAddToCartMutation()

    const { userId, token, quantity, size } = useSelector((state) => {
        return {
            userId: state.user.userId,
            token: state.user.token,
            quantity: state.productInfo.quantity,
            size: state.productInfo.size
        }
    })
    const navigate = useNavigate()
    const handleAddToWishlist = async () => {
        setWishlistLoading(true)
        if (!userId) {
            navigate('/login')
            return new Error('Login Required!')
        }
        if (data?.data?.categories[0]?.name.toLowerCase() === 'fashion' && !size) {
            console.error('select a size first')
            setSizeErr(true)
            setWishlistLoading(false)
            return;
        }
        const result = await addToWishList({
            uid: userId,
            pid: pid,
            token: token,
            quantity: quantity,
            size: size || null
        })
        if (result?.data?.status) {
            setWishlistLoading(false)
        }
    }
    const handleAddToCart = async () => {
        setCartLoading(true)
        if (!userId) {
            navigate('/login')
            return new Error('Login Required!')
        }
        if (data?.data?.categories[0]?.name.toLowerCase() === 'fashion' && !size) {
            console.error('select a size first')
            setSizeErr(true)
            setCartLoading(false)
            return;
        }
        const result = await addToCart({
            uid: userId,
            pid: pid,
            token: token,
            quantity: quantity,
            size: size || null
        })
        if (result?.data?.status) {
            setCartLoading(false)
        }
    }

    useEffect(() => {
        return () => {
            dispatch(resetProductInfo())
        }
    }, [])

    let content;

    if (isLoading) {
        content = <ProductSkeleton />
    }
    else if (!isLoading && !error) {
        let product = data.data
        content = (
            <div className="hero min-h-screen bg-white">
                <div className="hero-content flex-col lg:flex-row items-start justify-around">
                    <div className="lg:w-2/6 sm:w-3/5 rounded lg:sticky top-5">
                        <ProductCarousel images={product?.productImages || images} />
                    </div>
                    <Panel className="lg:w-3/6 py-4 bg-base-200 px-10 flex flex-col rounded-lg">
                        <ProductName product={product} />
                        <ProductRating product={product} />
                        <ProductDescription product={product} />
                        <Panel className='mt-4 bg-base-200 flex flex-row items-start justify-center flex-wrap'>
                            <ProductDetail>
                                Brand : <span className="font-h-b text-xl">{product?.brand}</span>
                            </ProductDetail>
                            <ProductDetail>
                                Category : <span className="font-h-b text-xl">{product?.categories[0]?.name}</span>
                            </ProductDetail>
                            <ProductDetail>
                                Sub-Category : <span className="font-h-b text-xl">{product?.categories[0]?.subcategories.map((item) => item)}</span>
                            </ProductDetail>
                            <ProductDetail>
                                Gender : <span className="font-h-b text-xl">{product?.gender}</span>
                            </ProductDetail>
                            <div className="w-fill p-2 bg-base-100 rounded-lg me-4 my-2">
                                <h2 className="inline-block font-t-b me-3">In Stock : <span className="font-h-b text-xl">{product?.availability && product?.quantity > 0 ? 'Yes' : 'No'}</span></h2>
                                {
                                    product?.availability &&
                                    <h2 className="inline-block font-t-b"><span className="font-t text-md">{product?.quantity} available</span></h2>
                                }
                            </div>
                            <div className="w-full flex items-center justify-center my-1">
                                {
                                    product?.categories[0]?.name?.toLowerCase() === 'fashion' &&
                                    <ProductSizeSelector resetSizeError={setSizeErr} product={product} />
                                }
                            </div>
                            <div className="w-full flex items-center justify-center">
                                {
                                    product?.quantity > 1 &&
                                    <ProductQuantitySelector />
                                }
                            </div>
                        </Panel>
                        <div className="flex items-center justify-around mt-4">
                            {
                                userId ?
                                    <>
                                        {
                                            wishlistLoading ? <span className="loading loading-spinner text-error"></span> :
                                                <Button onClick={handleAddToWishlist} dark className={`flex flex-row items-center${sizeErr && 'bg-red-400 cursor-not-allowed'}`}>
                                                    {
                                                        !sizeErr ?
                                                            <>
                                                                Add To Wishlist
                                                                <AiFillHeart className="text-xl fill-red-400" />
                                                            </> :
                                                            'Select a size first!'
                                                    }
                                                </Button>
                                        }
                                        {
                                            product?.availability && product?.quantity > 0 &&
                                            <>
                                                {
                                                    cartLoading ? <span className="loading loading-spinner text-error"></span> :
                                                        <Button onClick={handleAddToCart} dark className={`flex flex-row items-center${sizeErr && 'bg-red-400 cursor-not-allowed'}`}>
                                                            {
                                                                !sizeErr ?
                                                                    <>
                                                                        Add To Cart
                                                                        <BsFillCartFill className="text-xl" />
                                                                    </> : 'Select a size first!'
                                                            }
                                                        </Button>
                                                }

                                            </>
                                        }
                                    </>
                                    : (
                                        <Link to={'/login'} className="w-full">
                                            <Button dark className="flex flex-row w-full">
                                                Login to continue
                                            </Button>
                                        </Link>
                                    )
                            }
                        </div>
                    </Panel>
                </div>
            </div>
        )
    }

    else if (error) {
        console.error(error)
        content = (
            <ProductInfoError />
        )
    }
    return (
        <div>
            {content}
        </div>
    )
}

export default ProductInfoPage;