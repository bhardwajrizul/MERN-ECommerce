import CarouselVideo from '../assets/1.webm'
import { resetAll } from '../store';
import Button from './Button'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function Carousel() {
    const dispatch = useDispatch()

    return (
        <div className="w-[100%] h-[100%] carousel flex justify-center bg-base-100">
            <div className="carousel-item h-[100%] w-[100%]">
                <video rel='preload' src={CarouselVideo} className="w-full object-cover object-center" alt="Astello Brand Clothing" autoPlay muted loop />
                <div className='flex flex-col items-center justify-center absolute top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2'>
                    <h1 className='font-h-b text-gray-100 text-xl mb-8 md:text-4xl'>AETOS Movement Cargo Pants</h1>
                    <Link onClick={() => dispatch(resetAll())} to='/products'>
                        <Button className="text-sm text-white rounded btn btn-outline btn-default hover:bg-white hover:text-black">
                            Checkout the new Arrivals!
                        </Button>
                    </Link>
                </div>

            </div>
        </div>
    )
}