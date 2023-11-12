import Skeleton from '../Skeleton'
import { useState } from 'react'
import { CiStar } from 'react-icons/ci'
import { Link, useNavigate } from 'react-router-dom'


export default function ProductCard({
    image,
    name,
    description,
    categories,
    price,
    discountPercent,
    rating,
    ratingCount,
    brand,
    pid
}) {
    const [imageLoaded, setImageLoaded] = useState(false)
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/products/${pid}`)} className="card hover:cursor-pointer hover:bg-base-100 bg-white shadow-xl mx-2 mb-6">
            <figure className="bg-cover p-2 relative">
                {!imageLoaded && <Skeleton times={1} className='w-full h-80' />}
                <img
                    className={`w-full h-full rounded-lg border-2 border ${imageLoaded ? '' : 'hidden'}`}
                    src={image}
                    alt={name}
                    onLoad={() => setImageLoaded(true)}
                />
            </figure>
            <div className="card-body pt-2  px-4">
                <div className='flex flex-col mb-3'>
                    <h2 className="card-title font-h-b text-2xl">
                        {name}
                    </h2>
                    <h2 className="card-title font-h text-lg">
                        {brand}
                    </h2>
                </div>
                <div className="flex flex-row items-center justify-between">

                    <div className="mr-4 font-t-b">
                        Rs {Math.ceil(price - (price * discountPercent) / 100)}
                    </div>
                    <div className='flex flex-row items-center'>
                        <div className="mr-2 line-through font-t text-md">Rs {price}</div>
                        {
                            discountPercent < 30
                            && <div className="badge badge-ghost pt-1">{discountPercent} % off</div>
                        }
                        {
                            discountPercent >= 30
                            && <div className="badge text-white badge-error  pt-1">{discountPercent} % off</div>
                        }
                    </div>

                </div>

                <p className='font-t text-gray-500 mb-1'>{description}</p>
                <div className='flex flex-row items-end justify-between'>
                    <div className="card-actions justify-end">
                        {categories.map((category) => {
                            return (
                                <div className='flex flex-col' key={category._id}>
                                    <div className="badge badge-outline mb-2">{category.name}</div>
                                    <div className="badge badge-outline mb-2">{category.subcategories}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='flex flex-col items-center justify-end'>
                        <div className='flex flex-row items-center justify-start'>
                            <p className='text-xl inline flex-grow-0 mr-0'>{rating}</p>
                            <CiStar className='text-3xl mr-2 mb-1' />
                        </div>
                        <p className='flex-grow-0 text-sm'>
                            {ratingCount > 1 ? <>{ratingCount} reviews</> : <>{ratingCount} review</>}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}