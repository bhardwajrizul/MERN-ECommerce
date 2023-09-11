import CarouselVideo from '../assets/1.mp4'
import Button from './Button'

export default function Carousel() {
    const handleClick = () => {
        alert("Btn Clicked");
    }
    return (
        <div className="w-[100%] h-[100%] carousel flex justify-center">
            <div className="carousel-item h-[100%] w-[100%]">
                <video src={CarouselVideo} className="w-full object-cover object-center" alt="Astello Brand Clothing" autoPlay muted loop />
                <div className='flex flex-col items-center justify-center absolute top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2'>
                    <h1 className='font-h-b text-gray-100 text-xl mb-8 md:text-4xl'>AETOS Movement Cargo Pants</h1>
                    <Button onClick={handleClick} className=" text-sm text-white rounded btn btn-outline btn-default hover:bg-white hover:text-black">Checkout the new Arrivals!</Button>
                </div>

            </div>
        </div>
    )
}