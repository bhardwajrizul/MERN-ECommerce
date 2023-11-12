import {BsFillCartXFill} from 'react-icons/bs'
export default function NoItems() {
    return (
        <div className="alert flex flex-col gap-6 col-span-full p-20">
            <div className="flex items-center">
                <BsFillCartXFill className='text-4xl' />
                <span className="font-h-b text-pink-700 text-4xl ml-4">You have no order history!</span>
            </div>
            <div className="text-t-b text-xl text-lime">
                Browse through products and place an order today!
            </div>
        </div>
    )
}