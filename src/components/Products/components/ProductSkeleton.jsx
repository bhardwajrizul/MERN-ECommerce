import Skeleton from "../../Skeleton"
function ProductSkeleton() {
    return (
        <div className="hero min-h-screen bg-white">
            <div className="hero-content w-full flex-col lg:flex-row items-start justify-around">
                <div className="lg:w-2/6 w-full rounded">
                    <div className="w-full flex flex-col items-center">
                        <Skeleton times={1} className='w-full h-96 mx-[-35px]' />
                        <div className="w-full flex items-center justify-start mx-[-35px]">
                            <Skeleton times={4} className='w-20 h-20 me-2' />
                        </div>
                    </div>
                </div>
                <div className="lg:w-3/6 py-4">
                    <Skeleton times={1} className='w-96 h-10 rounded-lg mb-10' />
                    <Skeleton times={1} className='w-full h-5 rounded-lg mt-10' />
                    <Skeleton times={1} className='w-full h-3 rounded-lg mt-10' />
                    <Skeleton times={1} className='w-full h-3 rounded-lg' />
                    <Skeleton times={1} className='w-40 h-10 rounded-full mt-14' />
                </div>
            </div>
        </div>
    )
}

export default ProductSkeleton