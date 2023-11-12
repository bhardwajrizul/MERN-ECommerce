import {CiStar} from 'react-icons/ci'
import Panel from '../../Panel'

function ProductRating({ product }) {
    return (
        <Panel className="bg-base-200 mt-4 flex lg:flex-row flex-col justify-between">
            <div className="flex lg:flex-row items-center justify-start">

                <div className="mr-4 font-t-b text-3xl">
                    Rs {Math.ceil(product?.price - (product?.price * product?.discountPercent) / 100)}
                </div>
                <div className='flex flex-row items-center'>
                    <div className="mr-2 line-through font-t text-2xl">Rs {product?.price}</div>
                    {
                        product?.discountPercent < 30
                        && <div className="badge badge-ghost pt-1 text-xl">{product?.discountPercent} % off</div>
                    }
                    {
                        product?.discountPercent >= 30
                        && <div className="badge text-white lg:badge-error pt-1 text-xl">{product?.discountPercent} % off</div>
                    }
                </div>

            </div>
            <div className='flex flex-col items-center justify-end'>
                <div className='flex flex-row items-center justify-start'>
                    <p className='text-2xl  font-t-b inline flex-grow-0 mr-0'>{product?.rating}</p>
                    <CiStar className='text-3xl mr-2 mb-1 fill-yellow-400' />
                </div>
                <p className='flex-grow-0 text-sm'>
                    {product?.ratingCount > 1 ? <>{product?.ratingCount} reviews</> : <>{product?.ratingCount} review</>}
                </p>
            </div>

        </Panel>
    )
}

export default ProductRating