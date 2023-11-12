import {TbShoppingBagX} from 'react-icons/tb'
export default function NoItems() {
    return (
        <div className="alert flex flex-col gap-6 col-span-full p-20">
            <div className="flex items-center">
                <TbShoppingBagX className='text-4xl' />
                <span className="font-h-b text-pink-700 text-4xl ml-4">Feels so light in here!</span>
            </div>
            <div className="text-t-b text-xl text-lime">
                Continue Shopping and add items to your wishlist
            </div>
        </div>
    )
}